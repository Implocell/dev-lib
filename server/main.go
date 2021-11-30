package main

import (
	"github.com/gin-gonic/gin"
	"github.com/implocell/dev-lib/books"
	"github.com/implocell/dev-lib/common"
	"github.com/implocell/dev-lib/users"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	users.AutoMigrate()
	books.AutoMigrate()
}

func main() {
	// create the db instance

	db := common.Init()
	Migrate(db)

	r := gin.Default()

	v1 := r.Group("/api/v1")

	users.Router(v1.Group("/user"))
	v1.Use(users.AuthMiddleware(true))
	users.ProtectedRouter(v1.Group("/user"))
	books.ProtectedRouter(v1.Group("/books"))

	r.Run(":5000")
}
