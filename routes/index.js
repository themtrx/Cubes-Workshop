// TODO: Require Controllers...
const { Router } = require('express');
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes')
const { getAllAccessories } = require('../controllers/accessories')
const Cube = require('../models/Cube')
const Accessory = require('../models/Accessory')

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

    const cube = await getCubeWithAccessories(req.params.id)

        res.render('details', {
            title: 'Cube details',
            ...cube,
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

router.get('/create/accessory', (req, res) =>{
    res.render('createAccessory', {
        title: 'Create Accessory'
    })
})

router.post('/create/accessory', (req, res) =>{
    const {
        name,
        description,
        imageUrl
    } = req.body

    const accesory = new Accessory({name, description,imageUrl})

    accesory.save((err) => {
        if(err){
            console.log(err)
        }else {
            res.redirect('/create/accessory')
        }
    })
})


router.get('/attach/accessory/:id',async (req, res) =>{

    const cube = await getCube(req.params.id)
    const accessories = await getAllAccessories()

    const cubeAccessories = cube.accessories.map((id) => id.toString())

    const notAttachedAccessories = accessories.filter((x) => {
       return !cubeAccessories.includes(x._id.toString())
    })

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        ...cube,
        accessories: notAttachedAccessories,
        showAccessories: notAttachedAccessories.length>0
    })
    
})

router.post('/attach/accessory/:id',async (req, res) =>{
    const {
        accessory
    } = req.body
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

router.get('*', (req, res) =>{
    res.render('404', {
        title: 'Oh nooo!'
    })
})

module.exports = router
    
    