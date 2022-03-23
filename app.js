const express = require('express')
const placesRoutes = require("./routes/places-routes")


const app = express()

app.use('/api/places' , placesRoutes)

app.use((err, req, res, next) => {
    if(res.headerSent) {
        return next(err)
    }
    res.status(err.code || 500)
    res.json({message: err.message || "An unknown error occured."})
})

app.listen(5000 , () => {
    console.log("app is listening on port 5000")
})

