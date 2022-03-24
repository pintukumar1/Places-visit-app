const getCoordsForAddress = require("../util/location")
const Place = require('../models/place')
const validatePlaceInput = require('../validation/place')
const ValidateUpdatePlaceInput = require('../validation/updatePlace')

const getPlaceById = (req, res) => {
    const errors = {}
    Place.findById({ _id: req.params.pid })
        .then(place => {
            if (!place) {
                errors.place = "Place not found"
                return res.status(400).json(errors)
            }
            res.json(place);
        })
        .catch(err => {
            res.status(404).json({ place: "place not found with this id" })
        })
}


const getPlacesByUserId = (req, res) => {
    const errors = {}
    const userId = req.params.uid
    Place.find({ creator: userId })
        .then(places => {
            if (!places || places.length === 0) {
                errors.places = "No Place found with this user id"
                return res.status(400).json(errors)
            }
            res.json(places);
        })
        .catch(err => {
            res.status(404).json({ places: "failed to fetch places by user id" })
        })
}


const createPlace = async (req, res, next) => {
    const { errors, isValid } = validatePlaceInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const title = req.body.title
    const description = req.body.description
    const address = req.body.address
    const creator = req.body.creator

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address)
    } catch (error) {
        return next(error)
    }

    const place = new Place({
        title: title,
        description: description,
        address: address,
        location: coordinates,
        image: "https://image.shutterstock.com/image-photo/modern-tower-buildings-skyscrapers-business-260nw-1369677335.jpg",
        creator: creator
    })
    place.save()
        .then(result => {
            res.json({
                message: "Place created successfully",
                place: result
            })
        })
        .catch(err => {
            res.status(404).json({ place: "failed to create" })
        })
}

const updatePlace = (req, res) => {
    const placeId = req.params.pid;

    const { errors, isValid } = ValidateUpdatePlaceInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const title = req.body.title
    const description = req.body.description

    Place.findById(placeId)
        .then(place => {
            if (!place) {
                errors.place = "Place not found in the database,please check once !"
                return res.status(400).json(errors)
            }
            place.title = title;
            place.description = description;
            place.save()
                .then(result => {
                    res.json({ message: "Place updated", place: result })
                })
        })
        .catch(err => {
            res.status(404).json({ placenotfound: "Place not found!" })
        })
};


const deletePlace = (req, res) => {
    const errors = {}

    const placeId = req.params.pid;

    Place.findById(placeId)
        .then(place => {
            if (!place) {
                errors.place = "Place not found with this id.Please check once."
                return res.status(400).json(errors)
            }
            place.remove()
                .then(() => {
                    res.json({ message: "Place deleted successfully. " })
                })
        })
        .catch(err => {
            res.status(404).json({ placenotfound: "Place not found. " })
        })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace