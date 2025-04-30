use('empresa')

/*db.clientes.insertMany([
    { nombre: "Ana", apellido: "García" },
    { nombre: "Juan", apellido: "Pérez" },
    { nombre: "Laura", apellido: "Rodríguez" },
    { nombre: "Carlos", apellido: "López" },
    { nombre: "Sofía", apellido: "Martínez" }
]);*/

//Mejora rendimientos de las consultas que utilizen ambos campos
db.clientes.createIndex({ nombre: 1, apellido: 1 })
