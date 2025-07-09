const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const libroSchema = new mongoose.Schema({
    titulo: {type: String,required: true},
    autor: {type: String,required: true},
    isbn: {type: String, required: true},
    genero: {type: String, required: true},
    anioPublicacion: {type: Number,required: true},
    copias: {type: Number,required: true},
    disponibles: {type: Number,required: true}
})

const prestamoSchema = new mongoose.Schema({
    libroId: {type: ObjectId, required: true, ref: 'Libro'},
    usuario:{type: String, required:true },
    fechaPrestamo: {type: Date, required:true},
    fechaDevolucion: {type: Date, required:true},
    devuelto:{type: Boolean, required:true}
})

const Libro = mongoose.model('Libro', libroSchema);
const Prestamo = mongoose.model('Prestamo', prestamoSchema);

module.exports = {
    Libro,
    Prestamo
} 