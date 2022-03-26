const axios = require('axios')
const HttpError = require('../models/http-error');
require("dotenv").config()

const ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN

async function getCoordsForAddress(address) {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${ACCESS_TOKEN}`)
    const data = response.data;

    if (!data) {
        const error = new HttpError(
          'Could not find location for the specified address.',
          422
        );
        throw error;
      }
    
    const coordinates = {}
    coordinates.lat = data.features[0].center[1]
    coordinates.long = data.features[0].center[0]

    return coordinates
}

module.exports = getCoordsForAddress









  