const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const generateToken = data => {
    const token = jwt.sign(data, config.jwtKey);

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

const userAccess = (req, res, next) => {

    const token = req.cookies['aid']

    if(!token) {
        return res.redirect('/')
    }

    try{
        const decodedObj = jwt.verify(token, config.jwtKey)
        next()
    }catch (e) {

        res.redirect('/')
    } 

}

const guestAccess = (req, res, next) => {
    const token = req.cookies['aid']

    if(token) {
        return res.redirect('/')
    }

   next()
}

const getUserStatus = (req, res, next)=>{
    const token = req.cookies['aid']

    if(!token) {
        req.isLogged = false
    }

    try{
        const decodedObj = jwt.verify(token, config.jwtKey)
        req.isLogged = true
    }catch (e) {
        req.isLogged = false
    } 

    next()
}

module.exports = {
    saveUser,
    verifyUser,
    userAccess,
    guestAccess,
    getUserStatus
}