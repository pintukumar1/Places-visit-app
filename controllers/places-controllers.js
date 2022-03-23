const getCoordsForAddress = require("../util/location")
const Place = require('../models/place')
const validatePlaceInput = require('../validation/place')

const getPlaceById = (req, res, next) => {
    const errors = {}
    Place.findOne({ _id: req.params.pid })
        .then(place => {
            if (!place) {
                errors.place = "Place not found"
                return res.json(errors)
            }
            res.json(place);
        })
        .catch(err => {
            res.status(404).json({ place: "place not found with this id" })
        })
}

const getPlacesByUserId = (req, res, next) => {
    Place.find({ creator: req.params.uid })
        .then(places => {
            if (!places || places.length === 0) {
                errors.places = "No Place found with this user id"
            }
            res.json(places);
        })
        .catch(err => {
            res.status(404).json({ places: "No Places found." })
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
        console.log(result)
        res.status(201).json({
            message: "Place created successfully",
            place: result
        })
    })
    .catch(err => {
        res.status(400).json({place: "failed to create"})
    })
}
    // let coordinates;
    // try {
    //     coordinates = await getCoordsForAddress(address)
    // } catch (error) {
    //     return next(error)
    // }

    // const createdPlace = new Place({
    //     title: title,
    //     description: description,
    //     address: address,
    //     location: coordinates,
    //     image: "https://image.shutterstock.com/image-photo/modern-tower-buildings-skyscrapers-business-260nw-1369677335.jpg",
    //     creator: creator
    // })
    // try {
    //     await createdPlace.save()
    // } catch (err) {
    //     const error = new HttpError(
    //         "Creating place failed, please try again.",
    //         500
    //     )
    //     return next(error)
    // }
    // res.status(201).json({ place: createdPlace })


const updatePlace = async (req, res, next) => {


};


const deletePlace = (req, res, next) => {
    // const placeId = req.params.pid;
    // if (!DUMMY_PLACES.find(p => p.id === placeId)) {
    //     throw new HttpError('Could not find a place for that id', 404)
    // }
    // DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)

    // res.status(200).json({ message: "place deleted" })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace