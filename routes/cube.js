const { Router } = require('express');
const Cube = require('../models/Cube')
const { getCubeWithAccessories } = require('../controllers/cubes');

const router = Router();

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

router.get('/delete', (req, res) => {
    res.render('deleteCubePage', {
        title: 'Delete Cube'
    })
})

router.get('/edit', (req, res) => {
    res.render('editCubePage', {
        title: 'Edit Cube'
    })
})

module.exports = router