const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtKey = 'SOFTUNI-WORKSHOP'

const saveUser = async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        password: hashedPassword
    })

    const userObj = await user.save();
    const token = jwt.sign({
                    userID: userObj._id,
                    username: userObj.username
                    }, jwtKey);

    res.cookie('aid', token)

    return true;
}

module.exports = {
    saveUser
}