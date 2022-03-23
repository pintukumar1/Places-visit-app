const HttpError = require('../models/http-error')
const getCoordsForAddress = require("../util/location")
const { validationResult } = require('express-validator')
const Place = require('../models/place')

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError(
            "Something went wrong .could not find a place.",
            500
        );
        return next(error)
    }
    if (!place) {
        const error = new HttpError(
            "Could not find a place for the provided id.",
            404
        );
        return next(error);
    }
    res.json({ place: place.toObject({ getters: true }) })
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid
    let places
    try {
        places = await Place.find({ creator: userId })
    } catch (err) {
        const error = new HttpError("Fetching Places failed , please try again later.",
            500
        )
        return next(error)
    }
    if (!places || places.length === 0) {
        return next(
            new HttpError("Could not find places for the provided user id.", 404)
        )
    }

    res.json({ places: places.map(place => place.toObject({ getters: true })) })
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, Please check your data..', 422))
    }
    // const { title, description, coordinates, address, creator } = req.body ;
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

    const createdPlace = new Place({
        title: title,
        description: description,
        address: address,
        location: coordinates,
        image: "https://image.shutterstock.com/image-photo/modern-tower-buildings-skyscrapers-business-260nw-1369677335.jpg",
        creator: creator
    })
    try {
        await createdPlace.save()
    } catch (err) {
        const error = new HttpError(
            "Creating place failed, please try again.",
            500
        )
        return next(error)
    }
    res.status(201).json({ place: createdPlace })
}

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, Please check your data..', 422)
    }

    const title = req.body.title
    const description = req.body.description

    const placeId = req.params.pid;

    let place
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError("Something went wrong, could not update place",
            500
        )
        return next(error)
    }

    place.title = title
    place.description = description

    try {
        await place.save() 
    } catch (err) {
        const error = new HttpError("Something went wrong , could not update place.",
            500
        )
        return next(error)
    }
    res.status(200).json({ place: place.toObject({ getters: true }) })
}

const deletePlace = (req, res, next) => {
    const placeId  = req.params.pid;
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('Could not find a place for that id', 404)
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)

    res.status(200).json({ message: "place deleted" })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace