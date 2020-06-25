// TODO: Require Controllers...
const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes')

const router = Router();

router.get('/', async (req, res) =>{

    const cubes = await getAllCubes();

    res.render('index', {
        title: 'Welcome to Cubes',
        cubes
    })
})

router.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Cubes'
    })
})




module.exports = router
    
    