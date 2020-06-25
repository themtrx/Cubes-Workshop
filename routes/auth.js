const { Router } = require('express');
const { saveUser } = require('../controllers/user')

const router = Router();

router.get('/register', async (req, res) =>{
    
        res.render('registerPage', {
            title: 'Register',
        })
})

router.post('/register', async (req, res) =>{

    const status  = await saveUser(req, res);

    if(status) {
        res.redirect('/')
    }

    res.redirect('/')
})

router.get('/login', async (req, res) =>{

    res.render('loginPage', {
        title: 'Login',
    })
})

module.exports = router;