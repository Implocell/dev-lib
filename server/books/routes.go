package books

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/implocell/dev-lib/common"
	"github.com/implocell/dev-lib/users"
)

func ProtectedRouter(g *gin.RouterGroup) {
	g.POST("", BookCreate)
	g.PUT("/:slug", BookUpdate)
	g.DELETE("/:slug", BookDelete)
	g.POST("/:slug/favorite", BookFavorite)
	g.DELETE("/:slug/favorite", BookUnfavorite)
	g.POST("/:slug/comments", BookCommentCreate)
	g.DELETE("/:slug/comments/:id", BookCommentDelete)
	g.GET("", BookList)
	g.GET("/:slug", BookRetrieve)
	g.GET("/:slug/comments", BookCommentList)
	g.GET("/tags", TagList)
}

func BookCreate(c *gin.Context) {
	bookModelValidator := NewBookModelValidator()
	if err := bookModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"book": "validation"})
		return
	}

	if err := SaveOne(&bookModelValidator.bookModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"book": "database"})
		return
	}

	serializer := BookSerializer{c, bookModelValidator.bookModel}
	c.JSON(http.StatusCreated, gin.H{"book": serializer.Response()})
}

func BookList(c *gin.Context) {
	tag := c.Query("tag")
	author := c.Query("author")
	user := c.Query("user")
	favorited := c.Query("favorited")
	limit := c.Query("limit")
	offset := c.Query("offset")

	bookModels, modelCount, err := FindManyBook(tag, author, limit, offset, favorited, user)
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("invalid param")))
		return
	}

	serializer := BooksSerializer{c, bookModels}
	c.JSON(http.StatusOK, gin.H{"books": serializer.Response(), "booksCount": modelCount})
}

func BookFeed(c *gin.Context) {
	limit := c.Query("limit")
	offset := c.Query("offset")
	userModel := c.MustGet("user_model").(users.UserModel)
	if userModel.ID == 0 {
		c.AbortWithError(http.StatusUnauthorized, errors.New("{error : \"Require auth!\"}"))
		return
	}
	bookUserModel := GetBookUserModel(userModel)
	bookModels, modelCount, err := bookUserModel.GetBookFeed(limit, offset)
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("invalid param")))
		return
	}
	serializer := BooksSerializer{c, bookModels}
	c.JSON(http.StatusOK, gin.H{"books": serializer.Response(), "booksCount": modelCount})
}

func BookRetrieve(c *gin.Context) {
	slug := c.Param("slug")
	if slug == "feed" {
		BookFeed(c)
		return
	}
	bookModel, err := FindOneBook(&BookModel{Slug: slug})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("invalid slug")))
		return
	}
	serializer := BookSerializer{c, bookModel}
	c.JSON(http.StatusOK, gin.H{"book": serializer.Response()})
}

func BookUpdate(c *gin.Context) {
	slug := c.Param("slug")
	bookModel, err := FindOneBook(&BookModel{Slug: slug})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("invalid slug")))
		return
	}
	bookModelValidator := NewBookModelValidatorFillWith(bookModel)
	if err := bookModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}

	bookModelValidator.bookModel.ID = bookModel.ID
	if err := bookModel.Update(bookModelValidator.bookModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	serializer := BookSerializer{c, bookModel}
	c.JSON(http.StatusOK, gin.H{"book": serializer.Response()})
}

func BookDelete(c *gin.Context) {
	slug := c.Param("slug")
	err := DeleteBookModel(&BookModel{Slug: slug})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("invalid slug")))
		return
	}
	c.JSON(http.StatusOK, gin.H{"book": "Delete success"})
}

func BookFavorite(c *gin.Context) {
	slug := c.Param("slug")
	bookModel, err := FindOneBook(&BookModel{Slug: slug})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("invalid slug")))
		return
	}
	userModel := c.MustGet("user_model").(users.UserModel)
	err = bookModel.favoriteBy(GetBookUserModel(userModel))
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("books", errors.New("database error")))
		return
	}
	serializer := BookSerializer{c, bookModel}
	c.JSON(http.StatusOK, gin.H{"book": serializer.Response()})
}

func BookUnfavorite(c *gin.Context) {
	slug := c.Param("slug")
	bookModel, err := FindOneBook(&BookModel{Slug: slug})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("invalid slug")))
		return
	}
	userModel := c.MustGet("user_model").(users.UserModel)

	err = bookModel.unFavoriteBy(GetBookUserModel(userModel))
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("database error")))
		return
	}

	serializer := BookSerializer{c, bookModel}
	c.JSON(http.StatusOK, gin.H{"book": serializer.Response()})
}

func BookCommentCreate(c *gin.Context) {
	slug := c.Param("slug")
	bookModel, err := FindOneBook(&BookModel{Slug: slug})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("comment", errors.New("invalid slug")))
		return
	}
	commentModelValidator := NewCommentModelValidator()
	if err := commentModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}
	commentModelValidator.commentModel.Book = bookModel

	if err := SaveOne(&commentModelValidator.commentModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	serializer := CommentSerializer{c, commentModelValidator.commentModel}
	c.JSON(http.StatusCreated, gin.H{"comment": serializer.Response()})
}

func BookCommentDelete(c *gin.Context) {
	id64, err := strconv.ParseUint(c.Param("id"), 10, 32)
	id := uint(id64)
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("comment", errors.New("invalid id")))
		return
	}
	err = DeleteCommentModel([]uint{id})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("comment", errors.New("invalid id")))
		return
	}
	c.JSON(http.StatusOK, gin.H{"comment": "Delete success"})
}

func BookCommentList(c *gin.Context) {
	slug := c.Param("slug")
	bookModel, err := FindOneBook(&BookModel{Slug: slug})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("comments", errors.New("invalid slug")))
		return
	}
	err = bookModel.getComments()
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("comments", errors.New("database error")))
		return
	}
	serializer := CommentsSerializer{c, bookModel.Comments}
	c.JSON(http.StatusOK, gin.H{"comments": serializer.Response()})
}

func TagList(c *gin.Context) {
	tagModels, err := getAllTags()
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("books", errors.New("invalid param")))
		return
	}
	serializer := TagsSerializer{c, tagModels}
	c.JSON(http.StatusOK, gin.H{"tags": serializer.Response()})
}
