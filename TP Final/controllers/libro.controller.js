const { LibroModel } = require('../models/libro.model');

class LibroController {
  async getAllLibros(req, res) {
    try {
      const libros = await LibroModel.obtenerTodosLibrosModel();
      res.json(libros);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async agregarLibro(req, res) {
    try {
      const nuevoLibro = await LibroModel.agregarLibroModel(req.body);
      res.status(201).json(nuevoLibro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async buscarLibros(req, res) {
    try {
      const criterio = req.query.q || '';
      const libros = await LibroModel.buscarPorCriterioModel(criterio);
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async reportePopulares(req, res) {
    try {
      const topLibros = await LibroModel.obtenerTopPrestadosModel();
      res.json(topLibros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LibroController();

