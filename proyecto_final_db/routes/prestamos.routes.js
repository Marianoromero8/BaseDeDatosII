const express = require('express')
const prestamos = express.Router()
const prestamosController = require('../controllers/prestamos.controller.js')


//Obtener todos los prestamos (GET /libros/prestamos)
prestamos.get('/', prestamosController.getPrestamos)

//Obtener top 5 libros mas prestados
prestamos.get('/masPrestados', prestamosController.masPrestados)

//Prestar un libro(isbn, usuario) (POST /libros/prestamos/:isbn/:usuario)
prestamos.post('/:isbn/:usuario', prestamosController.prestarLibro)


//Devolver un libro(prestamoId) (/libros/prestamos/:prestamoID)
prestamos.put('/devolver/:prestamoId', prestamosController.devolverLibro)

module.exports = prestamos