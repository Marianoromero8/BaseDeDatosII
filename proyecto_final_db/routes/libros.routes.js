const express = require('express')
const libros = express.Router()
const librosController = require('../controllers/libros.controller.js')


//Obtener todos los libros (GET /libros)
libros.get('/', librosController.getLibros)


//Obtener un libro(criterio) por autor, titulo o genero (GET /libros/:criterio)
libros.get('/obtener/:criterio', librosController.getLibroCriterio)


//Agregar un libro (POST /libros)
libros.post('/', librosController.agregarLibro)



module.exports = libros