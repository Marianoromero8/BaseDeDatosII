use("tiendaOnline");

db.ventas.aggregate([
  {
    $addFields:{
      diaSemana: { $dayOfWeek: "$fecha" },
    }
  },
  {
    $group: {
      _id: "$diaSemana",
      cantidadVentas: { $sum: 1 },
      fechas: { $push: "$fecha" }
    }
  },
  {
    $addFields: {
      nombreDia: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", 1] }, then: "Domingo" },
            { case: { $eq: ["$_id", 2] }, then: "Lunes" },
            { case: { $eq: ["$_id", 3] }, then: "Martes" },
            { case: { $eq: ["$_id", 4] }, then: "Miércoles" },
            { case: { $eq: ["$_id", 5] }, then: "Jueves" },
            { case: { $eq: ["$_id", 6] }, then: "Viernes" },
            { case: { $eq: ["$_id", 7] }, then: "Sábado" }
          ],
          default: "Desconocido"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      diaSemana: "$_id",
      montoTotal: 1,
      cantidadVentas: 1,
      nombreDia: 1,
      fechas: 1
    }
  },
  {
    $sort: { cantidadVentas: -1 }
  },
/*   {
    $limit: 1
  } */
]);

