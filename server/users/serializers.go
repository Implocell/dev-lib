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
	Following bool   `json:"following"`
}

func (ps *ProfileSerializer) Response() ProfileResponse {
	userModel := ps.C.MustGet("user_model").(UserModel)
	profile := ProfileResponse{
		ID:        ps.ID,
		Username:  ps.Username,
		FirstName: ps.FirstName,
		LastName:  ps.LastName,
		Role:      ps.Role,
		Following: userModel.isFollowing(ps.UserModel),
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

func (us *UserSerializer) Response() UserResponse {
	userModel := us.c.MustGet("user_model").(UserModel)
	user := UserResponse{
		Username:  userModel.Username,
		FirstName: userModel.FirstName,
		LastName:  userModel.LastName,
		Role:      userModel.Role,
		Token:     common.GenToken(userModel.ID),
	}
	return user
}
