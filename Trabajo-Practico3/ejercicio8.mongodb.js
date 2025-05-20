// Obtener un informe de ventas que incluya:
/*
Top 3 productos más vendidos (por cantidad)
Para cada producto: nombre, categoría, total de unidades vendidas, monto total generado
Puntuación promedio en valoraciones
*/


db.productos.aggregate([
    {$lookup: {
      from: "ventas",
      localField: "_id",
      foreignField: "producto_id",
      as: "producto_venta"
    }},
    {$unwind: "$producto_venta"},
    {$group: {
        _id: {
            nombre: "$nombre",
            categoria: "$categoria",
            promedio_Valoraciones: {$avg: "$valoraciones.puntuacion"}
        },
        cantidadVendida: {$sum: 1},
        montoTotalGenerado: {$sum: { $multiply: [ "$producto_venta.cantidad", "$producto_venta.precio_unitario" ] }}
    }},
    {$sort: {
        cantidadVendida: -1
    }},
    {$limit: 3}
])