package users

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/implocell/dev-lib/common"
)

func Router(g *gin.RouterGroup) {
	g.POST("", UserRegistration)
	g.POST("/login", UserLogin)

}

func ProtectedRouter(g *gin.RouterGroup) {
	g.GET("", UserRetrieve)
	g.PUT("/", UserUpdate)
	g.GET("/:username", ProfileRetrieve)
	g.POST("/:username/follow", ProfileFollow)
	g.DELETE("/:username/follow", ProfileUnfollow)
}

func UserRegistration(c *gin.Context) {
	fmt.Println("Hit registration")
	userModelValidator := NewUserModelValidator()
	if err := userModelValidator.Bind(c); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"profile": "validation"})
		return

	}

	if err := SaveOne(&userModelValidator.userModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"registration": "database"})
		return

	}

	c.Set("user_model", userModelValidator.userModel)
	serializer := UserSerializer{c}
	c.JSON(http.StatusCreated, gin.H{"user": serializer.Response()})
}

func UserLogin(c *gin.Context) {
	fmt.Println("Hit Login")
	loginValidator := NewLoginValidator()
	if err := loginValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, "validation")
		return
	}
	fmt.Println(loginValidator.userModel.Email)
	userModel, err := FindOneUser(&UserModel{Email: loginValidator.userModel.Email})

	if err != nil {
		c.JSON(http.StatusForbidden, "Wrong email or password")
		return
	}

	if userModel.checkPassword(loginValidator.userModel.Password) != nil {
		fmt.Println(userModel.Password)
		c.JSON(http.StatusForbidden, "Wrong email or password")
		return
	}

	UpdateContextUserModel(c, userModel.ID)
	serializer := UserSerializer{c}
	c.JSON(http.StatusOK, serializer.Response())
}

func UserRetrieve(c *gin.Context) {
	serializer := UserSerializer{c}
	c.JSON(http.StatusOK, serializer.Response())
}

func ProfileRetrieve(c *gin.Context) {
	username := c.Param("username")
	userModel, err := FindOneUser(&UserModel{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("invalid username")))
		return
	}
	profileSerializer := ProfileSerializer{c, userModel}
	c.JSON(http.StatusOK, gin.H{"profile": profileSerializer.Response()})
}

func ProfileFollow(c *gin.Context) {
	username := c.Param("username")
	userModel, err := FindOneUser(&UserModel{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid username")))
		return
	}
	myUserModel := c.MustGet("user_model").(UserModel)
	err = myUserModel.following(userModel)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	serializer := ProfileSerializer{c, userModel}
	c.JSON(http.StatusOK, gin.H{"profile": serializer.Response()})
}

func ProfileUnfollow(c *gin.Context) {
	username := c.Param("username")
	userModel, err := FindOneUser(&UserModel{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid username")))
		return
	}
	myUserModel := c.MustGet("user_model").(UserModel)

	err = myUserModel.unFollowing(userModel)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	serializer := ProfileSerializer{c, userModel}
	c.JSON(http.StatusOK, gin.H{"profile": serializer.Response()})
}

func UserUpdate(c *gin.Context) {
	userModel := c.MustGet("user_model").(UserModel)
	userModelValidator := NewUserModelValidatorFillWith(userModel)
	if err := userModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}

	userModelValidator.userModel.ID = userModel.ID
	if err := userModel.Update(userModelValidator.userModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	UpdateContextUserModel(c, userModel.ID)
	serializer := UserSerializer{c}
	c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
}
