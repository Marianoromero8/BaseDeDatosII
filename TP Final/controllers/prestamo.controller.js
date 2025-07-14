const { PrestamoModel } = require('../models/prestamo.model');

class PrestamoController {
  async getAllPrestamos(req, res) {
    try {
      const prestamos = await PrestamoModel.obtenerTodosPrestamosModel();
      res.json(prestamos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async prestarLibro(req, res) {
    try {
      const { isbn, usuario } = req.body;
      const nuevoPrestamo = await PrestamoModel.prestarLibroModel({ isbn, usuario });
      res.status(201).json(nuevoPrestamo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async devolverLibro(req, res) {
    try {
      const { prestamoId } = req.params;
      const resultado = await PrestamoModel.devolverLibroModel(prestamoId);
      res.json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PrestamoController();

