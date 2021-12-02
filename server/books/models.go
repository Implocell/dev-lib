package books

import (
	"strconv"

	"github.com/implocell/dev-lib/common"
	"github.com/implocell/dev-lib/users"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Location uint

const (
	Oslo Location = iota + 1
	Bergen
	Stavanger
	Stockholm
	Krakow
)

type BookModel struct {
	gorm.Model
	Slug        string `gorm:"unique_index"`
	Title       string
	Description string `gorm:"size:2048"`
	Author      string
	User        BookUserModel
	UserID      uint
	Location    Location
	Borrowed    bool
	Borrowable  bool
	Tags        []TagModel     `gorm:"many2many:book_tags"`
	Comments    []CommentModel `gorm:"ForeignKey:BookID"`
}

type BookUserModel struct {
	gorm.Model
	UserModel      users.UserModel
	UserModelID    uint
	BookModels     []BookModel     `gorm:"ForeignKey:UserID"`
	FavoriteModels []FavoriteModel `gorm:"ForeignKey:FavoriteByID"`
}

type FavoriteModel struct {
	gorm.Model
	Favorite     BookModel
	FavoriteID   uint
	FavoriteBy   BookUserModel
	FavoriteByID uint
}

// Need a single tag model for all types?
// Tags should be equal across all assets, thus we need a common tag model that links into each individual tagmodel
// Use models.tag instead of string?
type TagModel struct {
	gorm.Model
	Tag        string      `gorm:"unique_index"`
	BookModels []BookModel `gorm:"many2many:book_tags"`
}

type CommentModel struct {
	gorm.Model
	Book   BookModel
	BookID uint
	User   BookUserModel
	UserID uint
	Body   string `gorm:"size:2048"`
}

func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(BookModel{})
	db.AutoMigrate(TagModel{})
	db.AutoMigrate(FavoriteModel{})
	db.AutoMigrate(BookUserModel{})
	db.AutoMigrate(CommentModel{})
}

func GetBookUserModel(userModel users.UserModel) BookUserModel {
	var bookUserModel BookUserModel
	if userModel.ID == 0 {
		return bookUserModel
	}
	db := common.GetDB()
	db.Where(&BookUserModel{
		UserModelID: userModel.ID,
	}).FirstOrCreate(&bookUserModel)
	bookUserModel.UserModel = userModel
	return bookUserModel
}

func GetBookModel(model BookModel) BookModel {
	var bookModel BookModel
	if bookModel.ID == 0 {
		return bookModel
	}
	db := common.GetDB()
	db.Where(&BookModel{
		Author: model.Author,
	}).FirstOrCreate(&bookModel)
	return bookModel
}

func (book BookModel) favoritesCount() int64 {
	db := common.GetDB()
	var count int64
	db.Model(&FavoriteModel{}).Where(FavoriteModel{FavoriteID: book.ID}).Count(&count)
	return count
}

func (book BookModel) isFavoriteBy(user BookUserModel) bool {
	db := common.GetDB()
	var favorite FavoriteModel
	db.Where(FavoriteModel{
		FavoriteID:   book.ID,
		FavoriteByID: user.ID,
	}).First(&favorite)
	return favorite.ID != 0
}

func (book BookModel) favoriteBy(user BookUserModel) error {
	db := common.GetDB()
	var favorite FavoriteModel
	err := db.FirstOrCreate(&favorite, &FavoriteModel{
		FavoriteID:   book.ID,
		FavoriteByID: user.ID,
	}).Error
	return err
}

func (book BookModel) unFavoriteBy(user BookUserModel) error {
	db := common.GetDB()
	err := db.Where(FavoriteModel{
		FavoriteID:   book.ID,
		FavoriteByID: user.ID,
	}).Error
	return err
}

func SaveOne(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

func FindOneBook(condition interface{}) (BookModel, error) {
	db := common.GetDB()
	var model BookModel
	err := db.Preload("User.UserModel").Preload(clause.Associations).First(&model).Error
	return model, err
}

func (bookModel *BookModel) getComments() error {
	db := common.GetDB()
	tx := db.Begin()
	tx.Model(bookModel).Preload("Comments")
	for i := range bookModel.Comments {
		tx.Model(&bookModel.Comments[i]).Preload("User")
		tx.Model(&bookModel.Comments[i].User).Preload("UserModel")
	}
	err := tx.Commit().Error
	return err
}

func getAllTags() ([]TagModel, error) {
	db := common.GetDB()
	var models []TagModel
	err := db.Find(&models).Error
	return models, err
}

func FindManyBook(tag, author, limit, offset, favorited, user string) ([]BookModel, int64, error) {
	db := common.GetDB()
	var models []BookModel
	var count int64

	offset_int, err := strconv.Atoi(offset)
	if err != nil {
		offset_int = 0
	}

	limit_int, err := strconv.Atoi(limit)
	if err != nil {
		limit_int = 20
	}

	tx := db.Begin()
	if tag != "" {
		var tagModel TagModel
		tx.Where(TagModel{Tag: tag}).First(&tagModel)
		if tagModel.ID != 0 {
			bookModels := tx.Model(&tagModel).Association("BookModels")
			count = bookModels.Count()

			books := []BookModel{}
			bookModels.Find(&books)
			for _, value := range books {
				models = append(models, value)
			}
		}
	} else if user != "" {
		var userModel users.UserModel
		tx.Where(users.UserModel{Username: author}).First(&userModel)
		bookUserModel := GetBookUserModel(userModel)
		if bookUserModel.ID != 0 {
			count = tx.Model(&bookUserModel).Association("BookModels").Count()
			tx.Model(&bookUserModel).Association("BookModels")
		}
	} else if favorited != "" {
		var userModel users.UserModel
		tx.Where(users.UserModel{Username: favorited}).First(&userModel)
		bookUserModel := GetBookUserModel(userModel)

		if bookUserModel.ID != 0 {
			var favoriteModels []FavoriteModel
			tx.Where(FavoriteModel{
				FavoriteByID: bookUserModel.ID,
			}).Offset(offset_int).Limit(limit_int).Find(&favoriteModels)

			count = tx.Model(&bookUserModel).Association("FavoriteModels").Count()
			for _, favorite := range favoriteModels {
				var model BookModel
				tx.Model(&favorite).Association("Favorite")
				models = append(models, model)
			}
		} else if author != "" {
			var bookModel BookModel
			tx.Where(BookModel{Author: author}).First(&bookModel)
			models = append(models, bookModel)
		}
	} else {
		db.Model(&models).Count(&count)
		db.Offset(offset_int).Limit(limit_int).Find(&models)
	}

	for i := range models {
		tx.Preload("User").Find(&models[i])
		tx.Preload("User.BookModels").Find(&models[i])
		tx.Preload("Tags").Find(&models[i])
	}
	err = tx.Commit().Error
	return models, count, err
}

func (bookUserModel *BookUserModel) GetBookFeed(limit, offset string) ([]BookModel, int, error) {
	db := common.GetDB()
	var models []BookModel
	var count int

	offset_int, err := strconv.Atoi(offset)
	if err != nil {
		offset_int = 0
	}
	limit_int, err := strconv.Atoi(limit)
	if err != nil {
		limit_int = 20
	}

	tx := db.Begin()
	followings := bookUserModel.UserModel.GetFollowings()

	var bookUserModels []uint
	for _, following := range followings {
		bookUserModel := GetBookUserModel(following)
		bookUserModels = append(bookUserModels, bookUserModel.ID)
	}

	tx.Where("user_id in (?)", bookUserModels).Order("updated_at desc").Offset(offset_int).Limit(limit_int).Find(&models)

	for i := range models {
		tx.Preload("User").Find(&models[i])
		tx.Preload("User.UserModel").Find(&models[i])
		tx.Preload("Tags").Find(&models[i])
	}
	err = tx.Commit().Error
	return models, count, err
}

func (model *BookModel) setTags(tags []string) error {
	db := common.GetDB()
	var tagList []TagModel
	for _, tag := range tags {
		var tagModel TagModel
		err := db.FirstOrCreate(&tagModel, TagModel{Tag: tag}).Error
		if err != nil {
			return err
		}
		tagList = append(tagList, tagModel)
	}
	model.Tags = tagList
	return nil
}

func (model *BookModel) Update(data interface{}) error {
	db := common.GetDB()
	err := db.Model(model).Updates(data).Error
	return err
}

func DeleteBookModel(condition interface{}) error {
	db := common.GetDB()
	err := db.Where(condition).Delete(BookModel{}).Error
	return err
}

func DeleteCommentModel(condition interface{}) error {
	db := common.GetDB()
	err := db.Where(condition).Delete(&CommentModel{}).Error
	return err
}
