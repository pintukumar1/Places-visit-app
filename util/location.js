const axios = require('axios')
const HttpError = require('../models/http-error')
const ACCESS_TOKEN = "pk.eyJ1Ijoia3VtYXJwaW50dTE3MTMxMjIiLCJhIjoiY2tuZHdiMjczMGJsdjJwb3p1YTN2eDI3YyJ9.b7W36qVfN2FnP8xapYAQFw"

async function getCoordsForAddress(address) {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${ACCESS_TOKEN}`)
    const data = response.data ;

    if (!data || data.status === "ZERO_RESULTS") {
        const error = new HttpError(
            "Could not find location for the specified address.", 422
        )
        throw error
    }

    const coordinates = data.features[0].center
    //  latitude: body.features[0].center[1]
    //  longitude: body.features[0].center[0],
    //  location: body.features[0].place_name
    return coordinates
}

module.exports = getCoordsForAddress
