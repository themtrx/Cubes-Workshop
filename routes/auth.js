const { Router } = require('express');
const { saveUser, verifyUser, userAccess, guestAccess, getUserStatus } = require('../controllers/user')

const router = Router();

router.get('/register',guestAccess,getUserStatus, async (req, res) =>{
    
        res.render('registerPage', {
            title: 'Register',
            isLogged: req.isLogged
        })
})

router.post('/register', async (req, res) =>{

    const status  = await saveUser(req, res);

    if(status) {
        return res.redirect('/')
    }

    res.redirect('/')
})

router.get('/login',guestAccess,getUserStatus, async (req, res) =>{
        res.render('loginPage', {
            title: 'Login',
            isLogged: req.isLogged
        })
})

router.post('/login', async (req, res) =>{

    const status = await verifyUser(req, res)

    if(status){
        return res.redirect('/')
    }

    res.redirect('/')
})

router.get('/logout',(req, res) =>{
    res.clearCookie('aid');
    res.redirect('/')
})

module.exports = router;