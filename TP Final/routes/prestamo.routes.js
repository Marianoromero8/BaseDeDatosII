const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamo.controller');

// GET /api/prestamos - Obtener todos los préstamos
router.get('/', prestamoController.getAllPrestamos);

// POST /api/prestamos/prestar - Registrar un nuevo préstamo
router.post('/prestar', prestamoController.prestarLibro);

// PUT /api/prestamos/devolver/:prestamoId - Devolver un libro prestado
router.put('/devolver/:prestamoId', prestamoController.devolverLibro);

module.exports = router;
