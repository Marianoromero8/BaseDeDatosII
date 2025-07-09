const mongoose = require('mongoose');
require('dotenv').config();
const Prestamo = require('../models/prestamo.model');

const prestamos = [
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000001"),
    libroId: new mongoose.Types.ObjectId("66bb10000100000000000001"),
    usuario: "Juan Pérez",
    fechaPrestamo: new Date("2025-07-01T10:00:00Z"),
    fechaDevolucion: new Date("2025-07-15T10:00:00Z"),
    devuelto: false
  },
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000002"),
    libroId: new mongoose.Types.ObjectId("66bb10000100000000000002"),
    usuario: "Ana Gómez",
    fechaPrestamo: new Date("2025-06-28T14:30:00Z"),
    fechaDevolucion: new Date("2025-07-12T14:30:00Z"),
    devuelto: true
  },
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000003"),
    libroId: new mongoose.Types.ObjectId("66bb1000010000000000000A"),
    usuario: "Carlos Díaz",
    fechaPrestamo: new Date("2025-07-02T09:00:00Z"),
    fechaDevolucion: new Date("2025-07-16T09:00:00Z"),
    devuelto: false
  },
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000004"),
    libroId: new mongoose.Types.ObjectId("66bb10000100000000000004"),
    usuario: "Lucía Romero",
    fechaPrestamo: new Date("2025-06-25T11:00:00Z"),
    fechaDevolucion: new Date("2025-07-09T11:00:00Z"),
    devuelto: true
  },
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000005"),
    libroId: new mongoose.Types.ObjectId("66bb10000100000000000005"),
    usuario: "Mateo Fernández",
    fechaPrestamo: new Date("2025-07-03T13:15:00Z"),
    fechaDevolucion: new Date("2025-07-17T13:15:00Z"),
    devuelto: false
  },
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000006"),
    libroId: new mongoose.Types.ObjectId("66bb10000100000000000003"),
    usuario: "Sofía Ríos",
    fechaPrestamo: new Date("2025-06-20T16:00:00Z"),
    fechaDevolucion: new Date("2025-07-04T16:00:00Z"),
    devuelto: true
  },
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000007"),
    libroId: new mongoose.Types.ObjectId("66bb10000100000000000006"),
    usuario: "Andrés Vargas",
    fechaPrestamo: new Date("2025-07-05T10:30:00Z"),
    fechaDevolucion: new Date("2025-07-19T10:30:00Z"),
    devuelto: false
  },
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000008"),
    libroId: new mongoose.Types.ObjectId("66bb10000100000000000008"),
    usuario: "Valentina Castro",
    fechaPrestamo: new Date("2025-06-30T12:45:00Z"),
    fechaDevolucion: new Date("2025-07-14T12:45:00Z"),
    devuelto: true
  },
  {
    _id: new mongoose.Types.ObjectId("66bb20000100000000000009"),
    libroId: new mongoose.Types.ObjectId("66bb1000010000000000000D"),
    usuario: "Diego Navarro",
    fechaPrestamo: new Date("2025-07-06T09:45:00Z"),
    fechaDevolucion: new Date("2025-07-20T09:45:00Z"),
    devuelto: false
  },
  {
    _id: new mongoose.Types.ObjectId("66bb2000010000000000000A"),
    libroId: new mongoose.Types.ObjectId("66bb1000010000000000000E"),
    usuario: "Camila Torres",
    fechaPrestamo: new Date("2025-07-01T08:00:00Z"),
    fechaDevolucion: new Date("2025-07-15T08:00:00Z"),
    devuelto: false
  }
];

async function seedPrestamos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Prestamo.deleteMany();
    await Prestamo.insertMany(prestamos);
    console.log(`✅ ${prestamos.length} préstamos insertados`);
    process.exit();
  } catch (err) {
    console.error('❌ Error insertando préstamos:', err);
    process.exit(1);
  }
}

seedPrestamos();
