// Cargar variables de entorno desde .env
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const libroRoutes = require('./routes/libro.routes');
const prestamoRoutes = require('./routes/prestamo.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/api/libros', libroRoutes);
app.use('/api/prestamos', prestamoRoutes);

// Conectar a la base de datos y arrancar el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
