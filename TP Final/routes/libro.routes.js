const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libro.controller');

// GET /api/libros - Obtener todos los libros
router.get('/', libroController.getAllLibros);

// POST /api/libros - Agregar un nuevo libro
router.post('/', libroController.agregarLibro);

// GET /api/libros/buscar?criterio=valor - Buscar libros por criterio
router.get('/buscar', libroController.buscarLibros);

// GET /api/libros/populares - Obtener reporte de libros más populares
router.get('/populares', libroController.reportePopulares)

module.exports = router;

//TODO: Este proyecto es una API que usa Node.js con Mongoose, puedo interacuar la misma con postman