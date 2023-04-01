const { Router } = require('express');
const express = require('express');
const router = express.Router();


const usuario_controller = require('../controllers/usuarioController');

//REGISTRARSE
router.post('/register',usuario_controller.usuario_create);

//LOGIN
router.get('/login/:mail/:pass', usuario_controller.usuario_login );


router.get('/', async (req, res) => {
    
    // const users = await User.find();
    //     res.json(users);
    res.json('API ON')
    })
    
module.exports = router;
