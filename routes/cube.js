const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const { Router } = require('express');
const Cube = require('../models/Cube')
const jwt = require('jsonwebtoken')
const { getCubeWithAccessories } = require('../controllers/cubes');
const { userAccess, getUserStatus } = require('../controllers/user');

const router = Router();

router.get('/details/:id',getUserStatus, async (req, res) =>{

    const cube = await getCubeWithAccessories(req.params.id)

        res.render('details', {
            title: 'Cube details',
            ...cube,
            isLogged: req.isLogged
        })
})

router.get('/create', userAccess ,getUserStatus, (req, res) =>{
    res.render('create', {
        title: 'Create new Cube',
        isLogged: req.isLogged
    })
})

router.post('/create',userAccess, (req, res) =>{
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const token = req.cookies['aid']
    const decodedObj = jwt.verify(token, config.jwtKey)

    const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel, creatorId: decodedObj.userID})

    cube.save((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
})

router.get('/delete',userAccess, getUserStatus, (req, res) => {
    res.render('deleteCubePage', {
        title: 'Delete Cube',
        isLogged: req.isLogged
    })
})

router.get('/edit',userAccess, getUserStatus, (req, res) => {
    res.render('editCubePage', {
        title: 'Edit Cube',
        isLogged: req.isLogged
    })
})

module.exports = router