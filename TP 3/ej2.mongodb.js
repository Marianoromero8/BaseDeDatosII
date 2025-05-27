use ("tiendaOnline");

// Agrupar por categoria y calcular el promedio, maximo y minimo de los precios de los productos en esa categoria

db.productos.aggregate([
    {
      $group: {
          _id:"$categoria",
          Promedio: {$avg: "$precio"},
          Maximo: {$max:"$precio"},
          Minimo: {$min:"$precio"},
      }
    }
]);

// Obtener el total de ventas por país, la cantidad de transacciones realizadas en cada país y el monto total

db.ventas.aggregate([
  {
    $group: {
      _id: "$cliente.pais",
      totalVentas: { $sum: "$total" },
      cantidadTransacciones: { $sum: 1 },
      clientes: { $addToSet: "$cliente.nombre" }  
    }
  },
  {
    $project: {
      pais: "$_id",
      _id: 0,
      totalVentas: 1,
      cantidadTransacciones: 1,
      clientes: 1
    }
  }
]);

  