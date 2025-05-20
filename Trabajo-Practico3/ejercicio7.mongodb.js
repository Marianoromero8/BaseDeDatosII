// Clasificar los productos según su precio: "Económico" (<100), "Estándar" (100-500), "Premium" (>500).
// Clasificar las ventas según su total: "Pequeña" (<200), "Mediana" (200-800), "Grande" (>800).

db.productos.aggregate([
    {$project: {
        Calidad: {$switch: {
            branches: [
                {case: {$lt: ["$precio", 100]}, then: "Económico"},
                {case: {$and: [{$gte: ["$precio", 100]}, {$lte: ["$precio", 500]}]}, then: "Estandar"}
            ],
            default: "Premium"
        }
    }, nombre: 1,
       _id: 0,
       precio: 1
    }},
    {$group: {
        _id: "$Calidad",
        CantidadCalidad: {$sum: 1}
    }}

])

db.ventas.aggregate([
    {$project: {
        Tamaño: {$switch: {
            branches: [
                {case: {$lt: ["$total", 200]}, then: "Pequeña"},
                {case: {$and: [{$gte: ["$total", 200]}, {$lte: ["$total", 800]}]}, then: "Mediana"}
            ],
            default: "Grande"
        }},
        producto_id: 1,
        _id: 0,
        total: 1

    }},
    {$group: {
        _id: "$Tamaño",
        CantidadCategoria: {$sum: 1}
    }}
])