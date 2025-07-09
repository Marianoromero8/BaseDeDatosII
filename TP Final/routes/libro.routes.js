const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libro.controller');

router.get('/', libroController.getAllLibros);
router.post('/', libroController.agregarLibro);
router.get('/buscar', libroController.buscarLibros);
router.get('/populares', libroController.reportePopulares);

module.exports = router;

//TODO: Este proyecto es una API que usa Node.js con Mongoose, puedo interacuar la misma con postman