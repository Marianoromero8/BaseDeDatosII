use("tiendaOnline");

/* 
Enriquecer cada documento de ventas con la información completa del producto vendido (mediante un lookup a la colección productos). 
Calcular el total vendido por categoría de producto. */

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
