const mongoose = require('mongoose');
require('dotenv').config();
const Libro = require('../models/libro.model');

const libros = [
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000001"),
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    isbn: "978-0307389732",
    genero: "Realismo mágico",
    anioPublicacion: 1967,
    copias: 5,
    disponibles: 2
  },
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000002"),
    titulo: "1984",
    autor: "George Orwell",
    isbn: "978-0451524935",
    genero: "Distopía",
    anioPublicacion: 1949,
    copias: 4,
    disponibles: 1
  },
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000003"),
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    isbn: "978-0060934347",
    genero: "Clásico",
    anioPublicacion: 1605,
    copias: 6,
    disponibles: 5
  },
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000004"),
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    isbn: "978-8408172179",
    genero: "Misterio",
    anioPublicacion: 2001,
    copias: 3,
    disponibles: 2
  },
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000005"),
    titulo: "El nombre de la rosa",
    autor: "Umberto Eco",
    isbn: "978-0156001311",
    genero: "Histórico",
    anioPublicacion: 1980,
    copias: 4,
    disponibles: 3
  },
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000006"),
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    isbn: "978-8437604947",
    genero: "Experimental",
    anioPublicacion: 1963,
    copias: 2,
    disponibles: 1
  },
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000007"),
    titulo: "Pedro Páramo",
    autor: "Juan Rulfo",
    isbn: "978-8437602356",
    genero: "Realismo mágico",
    anioPublicacion: 1955,
    copias: 3,
    disponibles: 3
  },
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000008"),
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    isbn: "978-0307950924",
    genero: "Fantasía",
    anioPublicacion: 1944,
    copias: 2,
    disponibles: 2
  },
  {
    _id: new mongoose.Types.ObjectId("66bb10000100000000000009"),
    titulo: "El amor en los tiempos del cólera",
    autor: "Gabriel García Márquez",
    isbn: "978-0307389731",
    genero: "Romance",
    anioPublicacion: 1985,
    copias: 4,
    disponibles: 3
  },
  {
    _id: new mongoose.Types.ObjectId("66bb1000010000000000000A"),
    titulo: "Los detectives salvajes",
    autor: "Roberto Bolaño",
    isbn: "978-8433974020",
    genero: "Narrativa",
    anioPublicacion: 1998,
    copias: 3,
    disponibles: 1
  },
  {
    _id: new mongoose.Types.ObjectId("66bb1000010000000000000B"),
    titulo: "Crónica de una muerte anunciada",
    autor: "Gabriel García Márquez",
    isbn: "978-0307387775",
    genero: "Crónica",
    anioPublicacion: 1981,
    copias: 5,
    disponibles: 5
  },
  {
    _id: new mongoose.Types.ObjectId("66bb1000010000000000000C"),
    titulo: "La ciudad y los perros",
    autor: "Mario Vargas Llosa",
    isbn: "978-8439708209",
    genero: "Realismo",
    anioPublicacion: 1963,
    copias: 4,
    disponibles: 2
  },
  {
    _id: new mongoose.Types.ObjectId("66bb1000010000000000000D"),
    titulo: "Ensayo sobre la ceguera",
    autor: "José Saramago",
    isbn: "978-8466319585",
    genero: "Ficción",
    anioPublicacion: 1995,
    copias: 3,
    disponibles: 1
  },
  {
    _id: new mongoose.Types.ObjectId("66bb1000010000000000000E"),
    titulo: "El túnel",
    autor: "Ernesto Sabato",
    isbn: "978-9871138151",
    genero: "Psicológica",
    anioPublicacion: 1948,
    copias: 2,
    disponibles: 1
  },
  {
    _id: new mongoose.Types.ObjectId("66bb1000010000000000000F"),
    titulo: "Sobre héroes y tumbas",
    autor: "Ernesto Sabato",
    isbn: "978-8420639267",
    genero: "Existencialismo",
    anioPublicacion: 1961,
    copias: 3,
    disponibles: 3
  }
];

async function seedLibros() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Libro.deleteMany();
    await Libro.insertMany(libros);
    console.log(`✅ ${libros.length} libros insertados`);
    process.exit();
  } catch (err) {
    console.error('❌ Error insertando libros:', err);
    process.exit(1);
  }
}

seedLibros();

