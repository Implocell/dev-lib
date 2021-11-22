package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

func NewUser(firstName, lastName, email, password string) *User {
	return &User{
		FirstName: firstName,
		LastName:  lastName,
		Email:     email,
		Password:  password,
	}
}

func (u *User) CreateUser(db *gorm.DB) error {
	result := db.Create(u)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (u *User) GetUser(db *gorm.DB) (*User, error) {
	result := db.Find(&u, u.Email)

	if result.Error != nil {
		return nil, result.Error
	}

	u.Password = ""

	return u, nil
}
