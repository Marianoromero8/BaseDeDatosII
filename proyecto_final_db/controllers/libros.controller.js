const { Libro } = require('../models/libro.models.js')

class LibroController {

    //Obtener todos los libros (GET /libros)
    async getLibros(req, res) {
        try {
            const libros = await Libro.find()
            res.status(200).json(libros)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    //Obtener un libro(criterio) por autor, titulo o genero (GET /libros/:criterio)
    async getLibroCriterio(req, res) {
        try {
            const criterio = req.params.criterio.toUpperCase()
            const libroCriterio = await Libro.find({ $or: [{ autor: criterio }, { titulo: criterio }, { genero: criterio }] })
            if (!libroCriterio) {
                return res.status(404).json({ message: 'libro no encontrado' })
            }

            res.status(200).json(libroCriterio)
        } catch (error) {
            res.status(400).json({ message: `Error al buscar libro por criterio: ${error.message}` })
        }
    }

    //Agregar un libro (POST /libros)
    async agregarLibro(req, res) {
        const libro = new Libro({
            titulo: req.body.titulo.toUpperCase(),
            autor: req.body.autor.toUpperCase(),
            isbn: req.body.isbn,
            genero: req.body.genero.toUpperCase(),
            anioPublicacion: req.body.anioPublicacion,
            copias: req.body.copias,
            disponibles: req.body.disponibles
        })

        try {
            const nuevoLibro = await libro.save()
            res.status(201).json(nuevoLibro)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

}



module.exports = new LibroController();