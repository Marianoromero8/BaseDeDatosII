const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
  libroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libro',
    required: true
  },
  usuario: {
    type: String,
    required: true,
    trim: true
  },
  fechaPrestamo: {
    type: Date,
    required: true
  },
  fechaDevolucion: {
    type: Date,
    required: true
  },
  devuelto: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = prestamoSchema;
