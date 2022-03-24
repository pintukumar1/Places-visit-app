const User = require('../models/user')
const ValidateSignupInput = require('../validation/signup')
const ValidateLoginInput = require('../validation/login')

const getUsers = (req, res, next) => {
    User.find({}, '-password')
        .then(users => {
            if (!users) {
                errors.users = "No users found"
            }
            res.json(users)
        })
        .catch(() => {
            res.status(404).json({ users: "failed to fetch users!" })
        })
}

const signup = (req, res) => {
    const { errors, isValid } = ValidateSignupInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                errors.user = "User already exists,please try a new email address"
                return res.status(400).json(errors)
            }
            const newUser = new User({
                name: name,
                email: email,
                password: password,
                image: "https://www.skymetweather.com/themes/skymet/images/gallery/toplists/Best-MS-Dhoni-Hairstyles-To-Flaunt-This-Summer/1.jpg",
                places: "Ballia,Delhi"
            })
            newUser.save()
                .then(result => {
                    res.json({ message: "user registerd succesfully", user: result })
                })
                .catch(() => {
                    res.status(404).json({ user: "failed to sign up" })
                })
        })
        .catch(err => {
            res.status(404).json(err)
        })
}

const login = (req, res, next) => {
    const { errors, isValid } = ValidateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
        .then(user => {
            if (!user || user.password !== password) {
                errors.user = "Invalid credentials, could not log you in"
                return res.status(404).json(errors)
            }
            res.json({
                message: "successfully logged in.",
                user: user
            })
        })
        .catch(err => {
            res.status(404).json({ user: "Login failed." })
        })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
