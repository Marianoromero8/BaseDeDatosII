const mongoose = require('mongoose');
const prestamoSchema = require('./entities/prestamo.entity');
const Libro = require('./libro.model').Libro;

const Prestamo = mongoose.model('Prestamo', prestamoSchema);

class PrestamoModel {
  async obtenerTodosPrestamosModel() {
    // populamos para traer info del libro
    return await Prestamo.find().populate('libroId');
  }

  async prestarLibroModel({ isbn, usuario }) {
    // Buscar el libro por ISBN
    const libro = await Libro.findOne({ isbn });
    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    if (libro.disponibles <= 0) {
      throw new Error('No hay copias disponibles');
    }

    const fechaPrestamo = new Date();
    const fechaDevolucion = new Date(fechaPrestamo);
    fechaDevolucion.setDate(fechaDevolucion.getDate() + 14); // préstamo por 14 días

    const nuevoPrestamo = new Prestamo({
      libroId: libro._id,
      usuario,
      fechaPrestamo,
      fechaDevolucion,
      devuelto: false
    });

    await nuevoPrestamo.save();
    
    libro.disponibles -= 1;
    await libro.save();

    return nuevoPrestamo;
  }

  async devolverLibroModel(prestamoId) {
    const prestamo = await Prestamo.findById(prestamoId);
    if (!prestamo) {
      throw new Error('Préstamo no encontrado');
    }

    if (prestamo.devuelto) {
      throw new Error('El libro ya fue devuelto');
    }

    prestamo.devuelto = true;
    await prestamo.save();

    const libro = await Libro.findById(prestamo.libroId);
    if (libro) {
      libro.disponibles += 1;
      await libro.save();
    }

    return { message: 'Libro devuelto correctamente' };
  }
}

module.exports = {
  PrestamoModel: new PrestamoModel(),
  Prestamo
};

