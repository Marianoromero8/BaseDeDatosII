// Agrupar las ventas por mes y calcular el total vendido en cada mes.
// Encontrar el día de la semana con más ventas.

db.ventas.aggregate([
    {$project: {
        mes: {$month: "$fecha"}
    }},

    {$group: {
        _id: "$mes",
        totalVendido: {$sum: 1}
    }}
])


db.ventas.aggregate([
    {$project: {
        diaDeLaSemana: {$dayOfWeek: "$fecha"}
    }},

    {$group: {
        _id: "$diaDeLaSemana",
        cantidadVendida: {$sum: 1}
    }},
    {$sort: {
        cantidadVendida: -1,
    }}
])