const bodyParser = require('body-parser')
const express = require('express')
const placesRoutes = require("./routes/places-routes")
const usersRoutes = require("./routes/users-routes")
const HttpError = require('./models/http-error')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api/places', placesRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404)
    throw error
})

app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err)
    }
    res.status(err.code || 500)
    res.json({ message: err.message || "An unknown error occured." })
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB Connected!")
    })
    .catch(err => {
        console.log(err)
    })

app.listen(5000, () => {
    console.log("app is listening on port 5000")
})

