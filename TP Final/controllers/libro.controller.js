const { LibroModel } = require('../models/libro.model');

class LibroController {
  async getAllLibros(req, res) {
    try {
      const libros = await LibroModel.obtenerTodos();
      res.json(libros);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async agregarLibro(req, res) {
    try {
      const nuevoLibro = await LibroModel.crearSiNoExiste(req.body);
      res.status(201).json(nuevoLibro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async buscarLibros(req, res) {
    try {
      const criterio = req.query.q || '';
      const libros = await LibroModel.buscarPorCriterio(criterio);
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async reportePopulares(req, res) {
    try {
      const topLibros = await LibroModel.obtenerTopPrestados();
      res.json(topLibros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LibroController();

