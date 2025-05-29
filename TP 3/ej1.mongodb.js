use ("tiendaOnline");

// obtener todos los productos de la categoría "Electrónica" que tengan un precio mayor a 500
db.productos.aggregate([
    {
      $match: {
        categoria: "Electrónica",
        precio: { $gt: 500 }
      }
    }
  ])

// encontrar las ventas realizadas a clientes de españa con estado entregado
  db.ventas.aggregate([
    {
      $match: {
        "cliente.pais": "España",
        estado: "Entregado"
      }
    }
  ])

  
