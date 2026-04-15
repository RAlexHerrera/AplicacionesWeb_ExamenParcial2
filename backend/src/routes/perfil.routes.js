const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfil.controller');

router.get('/:userId', perfilController.obtenerPerfil);
router.post('/:userId', perfilController.crearPerfil);
router.put('/:userId', perfilController.actualizarPerfil);

module.exports = router;