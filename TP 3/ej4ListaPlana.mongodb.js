use("tiendaOnline");

// Obtener una lista plana donde cada documento contenga una valoracion individual

db.productos.aggregate([
  {
    $unwind: "$valoraciones"  
  },
/*   {
    $project: {
      _id: 1, 
      nombre: 1,  
      usuario: "$valoraciones.usuario",
      puntuacion: "$valoraciones.puntuacion"
    }
  } */
])