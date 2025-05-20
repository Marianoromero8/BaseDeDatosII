/*
Calcular el precio promedio, máximo y mínimo por categoría de producto.
Obtener el total de ventas por país del cliente, incluyendo la cantidad de transacciones y el monto total.
*/

db.productos.aggregate([
    {$group:{
        _id: "$categoria",
        precioPromedio: {$avg: "$precio"},
        precioMaximo: {$max: "$precio"},
        precioMinimo: {$min: "$precio"}
    } }
])

db.ventas.aggregate([
    {$group: {
        _id: "$cliente.pais",
        totalVentas: {$sum: 1}, 
        cantidadTransacciones: {$sum: "$cantidad"},
        montoTotal: {$sum: "$total"}
    }}
])