use("tiendaOnline");
db.ventas.aggregate([
    {
        $lookup: {
            from: "productos",
            localField: "producto_id",
            foreignField: "_id",
            as: "productoInfo"
        }
    },
    {
        $unwind: "$productoInfo"
    },
    {
        $group: {
            _id: "$producto_id",
            nombreProducto: { $first: "$productoInfo.nombre" },
            categoriaProducto: { $first: "$productoInfo.categoria" },
            cantidadTotal: { $sum: "$cantidad" },
            montoTotal: { $sum: "$total" },
            valoraciones: { $first: "$productoInfo.valoraciones" }
        }
    },
    {
        $project: {
            _id: 1,
            nombreProducto: 1,
            categoriaProducto: 1,
            cantidadTotal: 1,
            montoTotal: 1,
            valoraciones: 1,
            promedioValoraciones: {$avg: "$valoraciones.puntuacion"}
        }
    },
    {
        $sort: {
            cantidadTotal: -1,
        }
    },
    {
        $limit: 3,
    }
])



  