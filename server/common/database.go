package common

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Database struct {
	*gorm.DB
}

var db *gorm.DB

func Init() *gorm.DB {
	dsn := "host=postgres user=postgres password=postgres_password dbname=postgres port=5432 sslmode=disable TimeZone=Europe/Oslo"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("db err: (Init) ", err)
	}

	db = database
	return db
}

func GetDB() *gorm.DB {
	return db
}
