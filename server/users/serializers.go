package users

import (
	"github.com/gin-gonic/gin"
	"github.com/implocell/dev-lib/common"
)

type ProfileSerializer struct {
	C *gin.Context
	UserModel
}

type ProfileResponse struct {
	ID        uint   `json:"-"`
	Username  string `json:"username"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Role      Role   `json:"role"`
}

func (self *ProfileSerializer) Response() ProfileResponse {
	profile := ProfileResponse{
		ID:        self.ID,
		Username:  self.Username,
		FirstName: self.FirstName,
		LastName:  self.LastName,
		Role:      self.Role,
	}
	return profile
}

type UserSerializer struct {
	c *gin.Context
}

type UserResponse struct {
	ID        uint   `json:"-"`
	Username  string `json:"username"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Role      Role   `json:"role"`
	Token     string `json:"token"`
}

func (self *UserSerializer) Response() UserResponse {
	userModel := self.c.MustGet("user_model").(UserModel)
	user := UserResponse{
		Username:  userModel.Username,
		FirstName: userModel.FirstName,
		LastName:  userModel.LastName,
		Role:      userModel.Role,
		Token:     common.GenToken(userModel.ID),
	}
	return user
}
