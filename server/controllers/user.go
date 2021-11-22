package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/implocell/dev-lib/db"
	"github.com/implocell/dev-lib/models"
	"github.com/implocell/dev-lib/utils"
)

func FindUser(w http.ResponseWriter, r *http.Request) {
	var err error
	q := r.URL.Query().Get("email")
	user := &models.User{Email: q}

	user, err = user.GetUser(db.GetDB())

	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, err.Error())
	}

	utils.RespondWithJSON(w, http.StatusAccepted, user)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User

	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&user); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	defer r.Body.Close()

	if err := user.CreateUser(db.GetDB()); err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondWithJSON(w, http.StatusCreated, user)

}
