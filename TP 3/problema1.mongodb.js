use("tiendaOnline");

db.productos.aggregate([
    // calculamos el promedio_puntuacion y la cantidad de valoraciones
    {
        $project: {
            nombre: 1,
            promedio_puntuacion: { $avg: "$valoraciones.puntuacion" },
            total_valoraciones: { $size: "$valoraciones" }
        }
    },
    // filtramos aquellos productos que tienen 2 omas valoraciones
    {
        $match: {
            total_valoraciones: { $gte: 2 }
        }
    },
    // ordenamos del que tiene el mayor promedio al menor promedio
    {
      $sort: { promedio_puntuacion: -1 }
    }
  ]);
  