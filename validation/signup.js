const isEmpty = require('./is-empty')
const Validator = require('validator')

module.exports = function validateSignUpInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    if(Validator.isEmpty(data.name)){
        errors.name = "name field is required"
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid. "
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "email field is required"
    }

    if(!Validator.isLength(data.password, {min: 6})) {
        errors.password = "password should be at least 6 characters"
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "password field is required"
    }

    
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}