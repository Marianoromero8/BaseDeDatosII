use("tiendaOnline")

/* Deconstruir el array de valoraciones de productos para obtener una lista plana donde cada documento contenga una valoración individual. 
Luego, agrupar por puntuación y contar cuántas valoraciones hay de cada puntuación. */

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