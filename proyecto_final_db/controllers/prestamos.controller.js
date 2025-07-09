const { Libro, Prestamo } = require('../models/libro.models.js')

class PrestamoController {
    //Obtener todos los prestamos (GET /prestamos)
    async getPrestamos(req, res) {
        try {
            const prestamos = await Prestamo.find()
            res.status(200).json(prestamos)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }



    //Obtener top 5 libros mas prestados
    async masPrestados(req, res) {
        try {
            const libros = await Libro.find()
            const prestamos = await Prestamo.aggregate([{ $group: { _id: '$libroId', totalPrestamos: { $sum: 1 } } }, { $sort: { totalPrestamos: -1 } }, { $limit: 5 }, { $lookup: { from: 'libros', localField: '_id', foreignField: '_id', as: 'InfoLibro' } }, { $unwind: '$InfoLibro' }, { $project: { _id: 0, titulo: '$InfoLibro.titulo', totalPrestamos: 1 } }])
            res.json(prestamos)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }


    //Prestar un libro(isbn, usuario) (POST /libros/prestamos/:isbn/:usuario)
    async prestarLibro(req, res) {
        const isbn = req.params.isbn.toString()
        const usuario = req.params.usuario
        try {
            libroEncontrado = await Libro.findOne({ isbn: isbn })
            const fechaPrestamo = new Date();
            const fechaDevolucion = new Date();
            fechaDevolucion.setDate(fechaPrestamo.getDate() + 15);
            if (libroEncontrado && libroEncontrado.disponibles > 0) {
                const prestamo = new Prestamo({
                    libroId: libroEncontrado._id,
                    usuario: usuario,
                    fechaPrestamo: fechaPrestamo,
                    fechaDevolucion: fechaDevolucion,
                    devuelto: false
                })

                libroEncontrado = await Libro.findOneAndUpdate({ isbn: isbn }, { $inc: { disponibles: -1 } })
                const nuevoPrestamo = await prestamo.save()
                return res.status(201).json({ message: `Prestamo creado: ${nuevoPrestamo}` })
            }

            else if (!libroEncontrado) {
                return res.status(404).json({ message: "Libro no encontrado" })
            }

            res.status(400).json({ message: `El libro no contiene suficientes copias disponibles! ${libroEncontrado.disponibles}` })

        } catch (error) {
            res.status(500).json({ message: `Error al querer hacer un prestamo: ${error.message}` })
        }
    }


    //Devolver un libro(prestamoId) (/prestamos/:prestamoID)
    async devolverLibro(req, res) {
        const prestamoId = req.params.prestamoId.toString()

        try {
            const prestamoEncontrado = await Prestamo.findOneAndUpdate({ _id: prestamoId }, { devuelto: true })

            if (!prestamoEncontrado) {
                return res.status(404).json({ message: `Prestamo no encontrado` })
            }

            const libro = await Libro.findOneAndUpdate({ _id: prestamoEncontrado.libroId }, { $inc: { disponibles: 1 } })
            libro.save()
            res.status(200).json({ message: `El libro ${libro.titulo} fue devuelto con exito` })
        } catch (error) {
            res.status(500).json({ message: `Error al devolver libro ${error.message}}` })
        }
    }



}


module.exports = new PrestamoController();

