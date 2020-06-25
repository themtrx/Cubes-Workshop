const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtKey = 'SOFTUNI-WORKSHOP'


const generateToken = data => {
    const token = jwt.sign(data, jwtKey);

    return token
}
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

    const token = generateToken({
        userID: userObj._id,
        username: userObj.username
    })

    res.cookie('aid', token)

    return true;
}

const verifyUser = async (req, res) => {

    const {
        username,
        password,
    } = req.body

    const user = await User.findOne({username})

    const status = await bcrypt.compare(password, user.password)

    if(status){

        const token = generateToken({
            userID: user._id,
            username: user.username
        })
        
         res.cookie('aid', token)

    }


    return status
}

module.exports = {
    saveUser,
    verifyUser
}