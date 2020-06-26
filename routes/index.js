// TODO: Require Controllers...
const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes')
const { getUserStatus } = require('../controllers/user')

const router = Router();

router.get('/',getUserStatus, async (req, res) =>{

    const cubes = await getAllCubes();

    res.render('index', {
        title: 'Welcome to Cubes',
        cubes,
        isLogged: req.isLogged
    })
})

router.get('/about',getUserStatus, (req, res) =>{
    res.render('about', {
        title: 'About Cubes',
        isLogged: req.isLogged
    })
})




module.exports = router
    
    