package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/implocell/dev-lib/models"
)

var db *gorm.DB

func InitDB() {
	dsn := "host=postgres user=postgres password=postgres_password dbname=postgres port=5432 sslmode=disable TimeZone=Europe/Oslo"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Database connection failed")
	}

	database.AutoMigrate(&models.User{})

	db = database
}

func GetDB() *gorm.DB {
	return db
}
