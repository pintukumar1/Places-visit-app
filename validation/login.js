const isEmpty = require('./is-empty')
const Validator = require('validator')

module.exports = function validateLoginInput(data) {
    let errors = {}
    
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    if(Validator.isEmpty(data.email)) {
        errors.email = "email field is required"
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "password field is required"
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}