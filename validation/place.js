const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePlaceInput(data) {

    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ""
    data.description = !isEmpty(data.description) ? data.description : ""
    data.address = !isEmpty(data.address) ? data.address : ""
    data.creator = !isEmpty(data.creator) ? data.creator : ""

    if (Validator.isEmpty(data.title)) {
        errors.title = "title field is required."
    }

    if (!Validator.isLength(data.description, { min: 5, max:300 })) {
        errors.description = "description must be of length 5 and less than 300 characters."
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "description field is required."
    }

    if (Validator.isEmpty(data.address)) {
        errors.address = "address field is required."
    }

    if (Validator.isEmpty(data.creator)) {
        errors.creator = "Creator field is required."
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}
