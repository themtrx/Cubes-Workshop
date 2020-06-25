const { Router } = require('express');

const router = Router();

router.get('/register', async (req, res) =>{

        res.render('registerPage', {
            title: 'Register',
        })
})

router.get('/login', async (req, res) =>{

    res.render('loginPage', {
        title: 'Login',
    })
})

module.exports = router;