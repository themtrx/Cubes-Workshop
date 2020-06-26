const { Router } = require('express');
const Accessory = require('../models/Accessory')
const { getAllAccessories } = require('../controllers/accessories')
const { getCube, updateCube } = require('../controllers/cubes')
const { userAccess, getUserStatus } = require('../controllers/user')

const router = Router();

router.get('/create/accessory',userAccess, getUserStatus, (req, res) =>{
    res.render('createAccessory', {
        title: 'Create Accessory',
        isLogged: req.isLogged
    })
})

router.post('/create/accessory',userAccess, (req, res) =>{
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


router.get('/attach/accessory/:id',userAccess,getUserStatus, async (req, res) =>{

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
        showAccessories: notAttachedAccessories.length>0,
        isLogged: req.isLogged
    })
    
})

router.post('/attach/accessory/:id',userAccess, async (req, res) =>{
    const {
        accessory
    } = req.body
    await updateCube(req.params.id, accessory)

    res.redirect(`/details/${req.params.id}`)
})

module.exports = router;