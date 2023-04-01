const { Router } = require('express');
const express = require('express');
const router = express.Router();


const categoria_controller = require('../controllers/categoriaController');

router.post('/api/categoria',categoria_controller.categoria_create);
router.get('/api/getCategorias', categoria_controller.categoria_get );


module.exports = router;
