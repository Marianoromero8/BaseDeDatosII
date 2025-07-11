use("tiendaOnline");

db.ventas.aggregate([
    // clasificar las ventas segun su total

    // con cond
    {
        $project: {
            _id: 1,
            total: 1,
            clasificacionTotal: {
                $cond: {
                    if: { $lt: ["$total", 200] },
                    then: "Pequeña",
                    else: {
                    $cond: {
                        if: { $and: [ { $gte: ["$total", 200] }, { $lte: ["$total", 800] } ] },
                        then: "Mediana",
                        else: {
                        $cond: {
                            if: { $gt: ["$total", 800] },
                            then: "Grande",
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
            _id: 1,
            total: 1,
            clasificacionTotal: {
                $switch: {
                    branches: [
                        { case: { $lt: ["$total", 200] }, then: "Pequeña" },
                        { case: { $and: [{ $gte: ["$total", 200] }, { $lte: ["$total", 800] }] }, then: "Mediana" },
                        { case: { $gt: ["$total", 800] }, then: "Grande" }
                    ],
                    default: "Desconocido"
                }
            }
        }
    }, */


    // agrupamos las ventas segun su clasificacionTotal
    {
        $group: {
            _id: "$clasificacionTotal",
            totalVentas: { $sum: 1 },
            ventasTotalIndividual: { $push: "$total" },
            VentasID: { $push: "$_id" }
        }
    },
    // renombramos _id a clasificacionTotal
    {
        $project: {
            _id: 0,
            clasificacionTotal: "$_id",
            totalVentas: 1,
            ventasTotalIndividual: 1,
            VentasID: 1
        }
    }
])