use("tiendaOnline");
// calcular el total de ventas por producto

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
    // si quiero un project primero

    {
      $project: {
        _id: 0,
        VentaID: "$_id",
        nombre: "$productoInfo.nombre",
        categoria: "$productoInfo.categoria",
        total: 1,
      }
    },
    {
      $group: {
        _id: "$categoria",
        totalVentas: { $sum: "$total" }
      }
    }


    // si quiero un group primero

    // agrupamos por categoria del producto y calcular el total de ventas
 /*    {
      $group: {
        _id: "$productoInfo.categoria",
        totalVentas: { $sum: "$total" }
      }
    },
    // cambiamos el nombre del campo _id a categoria
    {
      $project: {
        _id: 0,
        categoria: "$_id",
        totalVentas: 1
      }
    }, */
  ]);