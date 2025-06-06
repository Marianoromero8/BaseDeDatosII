use("tiendaOnline");
// Obtener el nombre y precio de todos los productos, y calcular el precio con un impuesto del 21%.

db.productos.aggregate([
    {
      $project: {
        _id: 0,
        nombre: 1,
        precio: 1,
        precioConImpuesto: {
          $multiply: ["$precio", 1.21]
        }
      }
    }
  ]);

// Crear una proyección que incluya el ID de venta, el nombre del cliente, el total y una nueva propiedad "descuento" que sea el 10% del total.

db.ventas.aggregate([
    {
      $project: {
        _id: 1,
        cliente: "$cliente.nombre",
        total: 1,
        descuento: {
            $multiply: ["$total", 0.1]
        }
      }
    }
  ]);