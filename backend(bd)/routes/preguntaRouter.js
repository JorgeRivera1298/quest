const { Router } = require('express');
const express = require('express');
const router = express.Router();


const pregunta_controller = require('../controllers/preguntaController');

router.post('/api/pregunta',pregunta_controller.pregunta_create);

module.exports = router;
