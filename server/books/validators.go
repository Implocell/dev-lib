package books

import (
	"github.com/gin-gonic/gin"
	"github.com/gosimple/slug"
	"github.com/implocell/dev-lib/common"
	"github.com/implocell/dev-lib/users"
)

type BookModelValidator struct {
	Book struct {
		Title       string   `form:"title" json:"title" required:"exists,min=4"`
		Author      string   `form:"author" json:"author" required:"exists,min=4"`
		Description string   `form:"description" json:"description" required:"max=2048"`
		Borrowable  bool     `form:"borrowable" json:"borrowable"`
		Borrowed    bool     `form:"borrowed" json:"borrowed"`
		Tags        []string `form:"tagList" json:"tagList"`
	} `json:"book"`
	bookModel BookModel `json:"-"`
}

func NewBookModelValidator() BookModelValidator {
	return BookModelValidator{}
}

func NewBookModelValidatorFillWith(bookModel BookModel) BookModelValidator {
	bookModelValidator := NewBookModelValidator()
	bookModelValidator.Book.Title = bookModel.Title
	bookModelValidator.Book.Description = bookModel.Description
	bookModelValidator.Book.Author = bookModel.Author
	for _, tagModel := range bookModel.Tags {
		bookModelValidator.Book.Tags = append(bookModelValidator.Book.Tags, tagModel.Tag)
	}
	return bookModelValidator
}

func (s *BookModelValidator) Bind(c *gin.Context) error {
	userModel := c.MustGet("user_model").(users.UserModel)

	err := common.Bind(c, s)
	if err != nil {
		return err
	}
	s.bookModel.Slug = slug.Make(s.Book.Title)
	s.bookModel.Title = s.Book.Title
	s.bookModel.Description = s.Book.Description
	s.bookModel.Author = s.Book.Author
	s.bookModel.User = GetBookUserModel(userModel)
	s.bookModel.Borrowable = s.Book.Borrowable
	s.bookModel.Borrowed = s.Book.Borrowed
	s.bookModel.setTags(s.Book.Tags)

	return nil
}

type CommentModelValidator struct {
	Comment struct {
		Body string `form:"body" json:"body" binding:"max=2048"`
	} `json:"comment"`
	commentModel CommentModel `json:"-"`
}

func NewCommentModelValidator() CommentModelValidator {
	return CommentModelValidator{}
}

func (s *CommentModelValidator) Bind(c *gin.Context) error {
	userModel := c.MustGet("user_model").(users.UserModel)

	err := common.Bind(c, s)
	if err != nil {
		return err
	}
	s.commentModel.Body = s.Comment.Body
	s.commentModel.User = GetBookUserModel(userModel)
	return nil
}
