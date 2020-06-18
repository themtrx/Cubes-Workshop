// TODO: Require Controllers...
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) =>{
    res.render('index', {
        title: 'Welcome to Cubes'
    })
})

router.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Cubes'
    })
})

router.get('/details/:id', (req, res) =>{
    res.render('details', {
        title: 'Cube details'
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
    
    