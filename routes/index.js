// TODO: Require Controllers...
const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes')
const { getOneCube } = require('../controllers/dbComunicator')

const router = Router();

router.get('/', (req, res) =>{
    getAllCubes((cubes) => {
        res.render('index', {
            title: 'Welcome to Cubes',
            cubes
        })
    })
})

router.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Cubes'
    })
})

router.get('/details/:id', (req, res) =>{
    getOneCube(req.params.id, (cube) => {
        res.render('details', {
            title: 'Cube details',
            ...cube
        })
    })
})

router.get('/create', (req, res) =>{
    res.render('create', {
        title: 'Create new Cube'
    })
})

router.get('*', (req, res) =>{
    res.render('404', {
        title: 'Oh nooo!'
    })
})

module.exports = router
    
    