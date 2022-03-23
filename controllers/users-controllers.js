const HttpError = require("../models/http-error")
const { v4: uuidv4 } = require('uuid')

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Pintu",
        email: "test@test.com",
        password: "testers"
    }
]

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS })
}

const signup = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const hasUser = DUMMY_USERS.find(u => u.email === email)
    if (hasUser) {
        throw new HttpError("Could not create user, email already exists. ")
    }

    const createdUser = {
        id: uuidv4(),
        name: name,
        email: email,
        password: password
    }
    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser })
}

const login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    const identifiedUser = DUMMY_USERS.find(u => u.email === email)
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Could not identify user, credentials seem to be wrong. ", 401);
    }
    res.json({ message: "Logged In" })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
