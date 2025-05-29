use("tiendaOnline");

db.productos.aggregate([
    // clasificar los productos por su precio

    // con Cond

    {
        $project: {
            _id: 0,
            nombre: 1,
            precio: 1,
            clasificacionPrecio: {
                $cond: {
                    if: { $lt: ["$precio", 100] },
                    then: "Económico",
                    else: {
                    $cond: {
                        if: { $and: [ { $gte: ["$precio", 100] }, { $lte: ["$precio", 500] } ] },
                        then: "Estándar",
                        else: {
                        $cond: {
                            if: { $gt: ["$precio", 500] },
                            then: "Premium",
                            else: "Desconocido"
                        }
                        }
                    }
                    }
                }
            }
        }
    },

    // con switch

    /* {
        $project: {
            _id: 0,
            nombre: 1,
            precio: 1,
            clasificacionPrecio: {
                $switch: {
                    branches: [
                        { case: { $lt: ["$precio", 100] }, then: "Económico" },
                        { case: { $and: [{ $gte: ["$precio", 100] }, { $lte: ["$precio", 500] }] }, then: "Estándar" },
                        { case: { $gt: ["$precio", 500] }, then: "Premium", else: "Desconocido" }
                    ],
                    default: "Desconocido"
                }
            }
        }
    }, */

    // agrupamos los productos por clasificacion de precio
    {
        $group: {
            _id: "$clasificacionPrecio",
            totalProductos: { $sum: 1 },
            productos: { $push: "$nombre" }
        }
    },
    // cambiamos el nombre del campo _id a clasificacionPrecio
    {
        $project: {
            _id: 0,
            clasificacionPrecio: "$_id",
            totalProductos: 1,
            productos: 1
        }
    },
])