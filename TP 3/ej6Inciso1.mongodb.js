use("tiendaOnline");
// Obtener el total vendido por mes
db.ventas.aggregate([
    {
      $addFields: {
        mes: { $month: "$fecha" }
      }
    },
    {
      $group: {
        _id: "$mes",
        totalVendido: { $sum: "$total" },
      }
    },
    {
      $project: {
        _id: 0,
        mes: "$_id",
        totalVendido: 1,
        productos: 1
      }
    }
  ]);
  