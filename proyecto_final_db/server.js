require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection

//Conexión de mongoose
mongoose.connect(process.env.DATABASE_URL)
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Database conectada'))

app.use(express.json())

//Rutas
const librosRouter = require('./routes/libros.routes.js')
const prestamosRouter = require('./routes/prestamos.routes.js')
app.use('/libros', librosRouter)
app.use('/prestamos', prestamosRouter)

//Prender el sv
app.listen(3000, () => {
    console.log('Server prendido')
})