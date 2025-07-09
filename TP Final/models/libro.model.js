const mongoose = require('mongoose');
const libroSchema = require('./entities/libro.entity');

// Creamos el modelo Mongoose
const Libro = mongoose.model('Libro', libroSchema);

class LibroModel {
  async obtenerTodos() {
    return await Libro.find();
  }

  async buscarPorCriterio(criterio = '') {
    const regex = new RegExp(criterio, 'i');
    return await Libro.find({
      $or: [
        { titulo: regex },
        { autor: regex },
        { genero: regex }
      ]
    });
  }

  async crearSiNoExiste(data) {
    const existente = await Libro.findOne({ isbn: data.isbn });
    if (existente) {
      throw new Error('El libro con ese ISBN ya existe');
    }
    return await Libro.create(data);
  }

  async obtenerTopPrestados() {
    return await Libro.aggregate([
      {
        $lookup: {
          from: 'prestamos',
          localField: '_id',
          foreignField: 'libroId',
          as: 'prestamos'
        }
      },
      {
        $addFields: {
          totalPrestamos: { $size: '$prestamos' }
        }
      },
      { $sort: { totalPrestamos: -1 } },
      { $limit: 5 },
      { $project: { prestamos: 0 } }
    ]);
  }
}

// Exportamos una instancia y el modelo Mongoose si se necesita
// Con el modelo Lbro se usa en prestamos para usar los metodos de Mongoose como find()
module.exports = {
  LibroModel: new LibroModel(),
  Libro // También exportamos el modelo por si otro archivo lo necesita
};
