const { Router } = require('express');
const { saveUser, verifyUser } = require('../controllers/user')

const router = Router();

router.get('/register', async (req, res) =>{
    
        res.render('registerPage', {
            title: 'Register',
        })
})

router.post('/register', async (req, res) =>{

    const status  = await saveUser(req, res);

    if(status) {
        return res.redirect('/')
    }

    res.redirect('/')
})

router.get('/login', async (req, res) =>{
        res.render('loginPage', {
            title: 'Login'
        })
})

router.post('/login', async (req, res) =>{

    const status = await verifyUser(req, res)

    if(status){
        return res.redirect('/')
    }

    res.redirect('/')
})


module.exports = router;