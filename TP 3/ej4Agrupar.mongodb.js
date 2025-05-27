use("tiendaOnline")

db.productos.aggregate([
    {
        $unwind: "$valoraciones"
    },
    {
        $group: {
            _id: "$valoraciones.puntuacion", 
            cantidadValoraciones: { $sum: 1 },
            // para ver los nombres de los productos
            productos: { $push: "$nombre" } 
        }
    },
    {
        $project: {
          _id: 0,
          puntuacion: "$_id",
          productos:1,
          cantidadValoraciones: 1
        }
    },
    {
        $sort: { puntuacion: -1 }
    },
]);