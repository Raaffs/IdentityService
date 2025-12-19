package utils

import (
	"fmt"
	"regexp"
	"strings"
)

type ValidationError struct {
	Key     string
	Message string
}	

var(
	MIN_NAME_LENGTH=3
	MAX_NAME_LENGTH=40
	AADHAR_LENGTH=10
	PHONE_NUMBER_LENGTH=10
)

var (
	ErrNameOutofRange      	= ValidationError{"name", fmt.Sprintf("name should be between %d - %d characters")}
	ErrFieldRequired       	= ValidationError{"field", "this field cannot be empty"}
	ErrInvalidEmail        	= ValidationError{"email", "invalid email address"}
	ErrPasswordTooWeak     	= ValidationError{"password", "password is too weak, must include letters, numbers, and special characters"}
	ErrInvalidPhone        	= ValidationError{"phone", "invalid phone number"}
	ErrInvalidAadharNumber 	= ValidationError{"aadhar", "invalid aadhar number"}
	ErrInvalidDate         	= ValidationError{"date", "invalid date format"}
)

func (v *Validator) NameLength(name string,min,max int) {
	v.Check(
     	len(strings.TrimSpace(name)) >= min && len(name) < max,
		ErrNameOutofRange.Key,
		fmt.Sprintf(ErrNameOutofRange.Message,min,max),
	)
}

func (v *Validator)Aadhar(aadhar string){
	v.Check(
	 	len(strings.TrimSpace(aadhar)) == AADHAR_LENGTH,
		ErrInvalidPhone.Key,
		ErrInvalidPhone.Message,
	)
}

func (v *Validator) Phone(phone string)  {
	re := regexp.MustCompile(`^\+?(\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$`)
	v.Check(
		re.MatchString(phone),
		ErrInvalidPhone.Key,
		ErrInvalidPhone.Message,
	)
}

func (v *Validator)Date(date string)  {
	re := regexp.MustCompile(`^\d{4}-\d{2}-\d{2}$`);
	v.Check(
	 	re.MatchString(date),
		ErrInvalidDate.Key,
		ErrInvalidDate.Message,
	)
}