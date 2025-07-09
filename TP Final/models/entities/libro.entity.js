// const mongoose = require('mongoose');

// const libroSchema = new mongoose.Schema({
//   titulo: { type: String, required: true, trim: true },
//   autor: { type: String, required: true, trim: true },
//   isbn: { type: String, required: true, unique: true },
//   genero: { type: String, required: true },
//   anioPublicacion: { type: Number, required: true },
//   copias: { type: Number, default: 1, min: 0 },
//   disponibles: { type: Number, default: 1, min: 0 }
// }, {
//   timestamps: true 
// });

// module.exports = mongoose.model('Libro', libroSchema);

const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  autor: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true },
  genero: { type: String, required: true },
  anioPublicacion: { type: Number, required: true },
  copias: { type: Number, default: 1, min: 0 },
  disponibles: { type: Number, default: 1, min: 0 }
}, {
  timestamps: true // para agregar automáticamente createdAt y updatedAt.
});

module.exports = libroSchema;
