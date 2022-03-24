const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateUpdatePlaceInput(data) {
    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ""
    data.description = !isEmpty(data.description) ? data.description : ""

    if(Validator.isEmpty(data.title)){
        errors.title = "title field is required"
    }

    if(!Validator.isLength(data.description, {min:5, max: 300})) {
        errors.description = "description must be of length 5 characters and less than 300 characters."
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "description field is required."
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}
