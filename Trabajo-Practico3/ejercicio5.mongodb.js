/*
Enriquecer cada documento de ventas con la información completa del producto vendido (mediante un lookup a la colección productos).
Calcular el total vendido por categoría de producto.
*/

db.ventas.aggregate([
    {$lookup: {
      from: "productos",
      localField: "producto_id",
      foreignField: "_id",
      as: "informacion_Completa"
    }},

    {$unwind: "$informacion_Completa"},

    {$project: {
      _id: 1,
      "informacion_Completa.nombre": 1,
      "informacion_Completa.categoria": 1,
      cantidad: 1,
      precio_unitario: 1,
      
    }},
])

db.ventas.aggregate([
    {$lookup: {
      from: "productos",
      localField: "producto_id",
      foreignField: "_id",
      as: "informacion_Completa"
    }},

    {$unwind: "$informacion_Completa"},

    {$project: {
      _id: 1,
      "informacion_Completa.nombre": 1,
      "informacion_Completa.categoria": 1,
      cantidad: 1,
    }},

    {$group: {
        _id: "$informacion_Completa.categoria",
        totalVentas: {$sum: 1}
    }}
])