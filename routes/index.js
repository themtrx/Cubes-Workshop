// TODO: Require Controllers...
const { Router } = require('express');
const { getAllCubes, getCube } = require('../controllers/cubes')
const Cube = require('../models/Cube')

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

router.get('/details/:id', async (req, res) =>{
    const cube = await getCube(req.params.id)

        res.render('details', {
            title: 'Cube details',
            ...cube
        })
})

router.get('/create', (req, res) =>{
    res.render('create', {
        title: 'Create new Cube'
    })
})
router.post('/create', (req, res) =>{
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel})
    cube.save((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
})

router.get('*', (req, res) =>{
    res.render('404', {
        title: 'Oh nooo!'
    })
})

module.exports = router
    
    