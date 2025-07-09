const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamo.controller');

router.get('/', prestamoController.getAllPrestamos);
router.post('/prestar', prestamoController.prestarLibro);
router.put('/devolver/:prestamoId', prestamoController.devolverLibro);

module.exports = router;
