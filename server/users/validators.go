package users

import (
	"github.com/gin-gonic/gin"
	"github.com/implocell/dev-lib/common"
)

type UserModelValidator struct {
	User struct {
		Username  string `form:"username" json:"username" binding:"required,alphanum,min=4,max=255"`
		FirstName string `form:"firstName" json:"firstName" binding:"required,alphanum,min=1,max=255"`
		LastName  string `form:"lastName" json:"lastName" binding:"required,alphanum,min=1,max=255"`
		Email     string `form:"email" json:"email" binding:"required,email"`
		Password  string `form:"password" json:"password" binding:"required,min=8,max=255"`
	} `json:"user"`
	userModel UserModel `json:"-"`
}

func (umv *UserModelValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, umv)
	if err != nil {
		return err
	}

	umv.userModel.Username = umv.User.Username
	umv.userModel.Email = umv.User.Email
	umv.userModel.FirstName = umv.User.FirstName
	umv.userModel.LastName = umv.User.LastName

	if umv.User.Password != common.NBRandomPassword {
		umv.userModel.setPassword(umv.User.Password)
	}

	return nil
}

func NewUserModelValidator() UserModelValidator {
	userModelValidator := UserModelValidator{}
	return userModelValidator
}

func NewUserModelValidatorFillWith(userModel UserModel) UserModelValidator {
	userModelValidator := NewUserModelValidator()
	userModelValidator.User.Username = userModel.Username
	userModelValidator.User.Email = userModel.Email
	userModelValidator.User.FirstName = userModel.FirstName
	userModelValidator.User.LastName = userModel.LastName
	userModelValidator.User.Password = common.NBRandomPassword

	return userModelValidator
}

type LoginValidator struct {
	User struct {
		Email    string `form:"email" json:"email" binding:"required,email"`
		Password string `form:"password" json:"password" binding:"required,min=8,max=255"`
	} `json:"user"`
	userModel UserModel `json:"-"`
}

func (lv *LoginValidator) Bind(c *gin.Context) error {
	err := common.Bind(c, lv)
	if err != nil {
		return err
	}

	lv.userModel.Email = lv.User.Email
	return nil
}

// You can put the default value of a Validator here
func NewLoginValidator() LoginValidator {
	loginValidator := LoginValidator{}
	return loginValidator
}
