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
]);
