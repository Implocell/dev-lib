package users

import (
	"errors"

	"github.com/implocell/dev-lib/common"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Role uint

const (
	User Role = iota + 1
	Moderator
	Administrator
)

type UserModel struct {
	gorm.Model
	FirstName string `gorm:"column:first_name;not null"`
	LastName  string `gorm:"column:last_name;not null"`
	Email     string `gorm:"column:email;not null;unique"`
	Password  string `gorm:"column:password;not null"`
	Username  string `gorm:"column:username;unique"`
	Role      Role   `gorm:"column:role;default:1"`
}

type FollowModel struct {
	gorm.Model
	Following    UserModel
	FollowingID  uint
	FollowedBy   UserModel
	FollowedByID uint
}

func AutoMigrate() {
	db := common.GetDB()
	db.AutoMigrate(&UserModel{})
	db.AutoMigrate(&FollowModel{})
}

func (UserModel) TableName() string {
	return "users"
}

func (u *UserModel) setPassword(password string) error {
	if len(password) == 0 {
		return errors.New("password should not be empty")
	}
	bytePassword := []byte(password)
	// Make sure the second param `bcrypt generator cost` between [4, 32)
	passwordHash, _ := bcrypt.GenerateFromPassword(bytePassword, bcrypt.DefaultCost)
	u.Password = string(passwordHash)
	return nil
}

func (u *UserModel) checkPassword(password string) error {
	bytePassword := []byte(password)
	byteHashedPassword := []byte(u.Password)

	return bcrypt.CompareHashAndPassword(byteHashedPassword, bytePassword)
}

// You could input the conditions and it will return an UserModel in database with error info.
// 	userModel, err := FindOneUser(&UserModel{Username: "username0"})
func FindOneUser(condition interface{}) (model UserModel, err error) {
	db := common.GetDB()
	err = db.Where(condition).First(&model).Error
	return model, err
}

// You could input an UserModel which will be saved in database returning with error info
// 	if err := SaveOne(&userModel); err != nil { ... }
func SaveOne(data interface{}) error {
	db := common.GetDB()
	err := db.Save(data).Error
	return err
}

func (model *UserModel) Update(data interface{}) error {
	db := common.GetDB()
	err := db.Model(model).Updates(data).Error
	return err
}

func (u UserModel) following(v UserModel) error {
	db := common.GetDB()
	var follow FollowModel
	err := db.FirstOrCreate(&follow, &FollowModel{
		FollowingID:  v.ID,
		FollowedByID: u.ID,
	}).Error
	return err
}

func (u UserModel) isFollowing(v UserModel) bool {
	db := common.GetDB()
	var follow FollowModel
	db.Where(FollowModel{
		FollowingID:  v.ID,
		FollowedByID: u.ID,
	}).First(&follow)
	return follow.ID != 0
}

func (u UserModel) unFollowing(v UserModel) error {
	db := common.GetDB()
	err := db.Where(FollowModel{
		FollowingID:  v.ID,
		FollowedByID: u.ID,
	}).Delete(&FollowModel{}).Error
	return err
}

func (u UserModel) GetFollowings() []UserModel {
	db := common.GetDB()
	tx := db.Begin()
	var follows []FollowModel
	var followings []UserModel
	tx.Where(FollowModel{
		FollowedByID: u.ID,
	}).Find(&follows)
	for _, follow := range follows {
		var userModel UserModel
		tx.Model(&follow).Preload("Following")
		followings = append(followings, userModel)
	}
	tx.Commit()
	return followings
}
