package books

import (
	"github.com/gin-gonic/gin"
	"github.com/gosimple/slug"
	"github.com/implocell/dev-lib/users"
)

type TagSerializer struct {
	C *gin.Context
	TagModel
}

type TagsSerializer struct {
	C    *gin.Context
	Tags []TagModel
}

func (s *TagSerializer) Response() string {
	return s.TagModel.Tag
}

func (s *TagsSerializer) Response() []string {
	response := []string{}
	for _, tag := range s.Tags {
		serializer := TagSerializer{s.C, tag}
		response = append(response, serializer.Response())
	}
	return response
}

type BookUserSerializer struct {
	C *gin.Context
	BookUserModel
}

func (s *BookUserSerializer) Response() users.ProfileResponse {
	response := users.ProfileSerializer{
		C:         s.C,
		UserModel: s.BookUserModel.UserModel,
	}
	return response.Response()
}

type BookSerializer struct {
	C *gin.Context
	BookModel
}

type BookResponse struct {
	ID             uint                  `json:"-"`
	Title          string                `json:"title"`
	Slug           string                `json:"slug"`
	Description    string                `json:"description"`
	CreatedAt      string                `json:"createdAt"`
	UpdatedAt      string                `json:"updatedAt"`
	Author         string                `json:"author"`
	User           users.ProfileResponse `json:"user"`
	Tags           []string              `json:"tagList"`
	Favorite       bool                  `json:"favorited"`
	FavoritesCount uint                  `json:"favoritesCount"`
	Borrowable     bool                  `json:"borrowable"`
	Borrowed       bool                  `json:"borrowed"`
}

type BooksSerializer struct {
	C     *gin.Context
	Books []BookModel
}

func (s *BookSerializer) Response() BookResponse {
	userModel := s.C.MustGet("user_model").(users.UserModel)
	bookUserSerializer := BookUserSerializer{s.C, s.User}
	response := BookResponse{
		ID:             s.ID,
		Slug:           slug.Make(s.Title),
		Title:          s.Title,
		Description:    s.Description,
		CreatedAt:      s.CreatedAt.UTC().Format("2006-01-02T15:04:05.999Z"),
		UpdatedAt:      s.UpdatedAt.UTC().Format("2006-01-02T15:04:05.999Z"),
		Author:         s.Author,
		User:           bookUserSerializer.Response(),
		Favorite:       s.isFavoriteBy(GetBookUserModel(userModel)),
		FavoritesCount: uint(s.favoritesCount()),
		Borrowable:     s.Borrowable,
		Borrowed:       s.Borrowed,
	}
	response.Tags = make([]string, 0)
	for _, tag := range s.Tags {
		serializer := TagSerializer{s.C, tag}
		response.Tags = append(response.Tags, serializer.Response())
	}
	return response
}

func (s *BooksSerializer) Response() []BookResponse {
	response := []BookResponse{}
	for _, book := range s.Books {
		serializer := BookSerializer{s.C, book}
		response = append(response, serializer.Response())
	}
	return response
}

type CommentSerializer struct {
	C *gin.Context
	CommentModel
}

type CommentsSerializer struct {
	C        *gin.Context
	Comments []CommentModel
}

type CommentResponse struct {
	ID        uint                  `json:"id"`
	Body      string                `json:"body"`
	CreatedAt string                `json:"createdAt"`
	UpdatedAt string                `json:"updatedAt"`
	User      users.ProfileResponse `json:"author"`
}

func (s *CommentSerializer) Response() CommentResponse {
	userSerializer := BookUserSerializer{s.C, s.User}
	response := CommentResponse{
		ID:        s.ID,
		Body:      s.Body,
		CreatedAt: s.CreatedAt.UTC().Format("2006-01-02T15:04:05.999Z"),
		UpdatedAt: s.UpdatedAt.UTC().Format("2006-01-02T15:04:05.999Z"),
		User:      userSerializer.Response(),
	}
	return response
}

func (s *CommentsSerializer) Response() []CommentResponse {
	response := []CommentResponse{}
	for _, comment := range s.Comments {
		serializer := CommentSerializer{s.C, comment}
		response = append(response, serializer.Response())
	}
	return response
}
