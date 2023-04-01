const { Router } = require('express');
const express = require('express');
const router = express.Router();

const respuesta_controller = require('../controllers/respuestaController');

router.post('/api/respuesta', respuesta_controller.respuesta_create);
module.exports = router;