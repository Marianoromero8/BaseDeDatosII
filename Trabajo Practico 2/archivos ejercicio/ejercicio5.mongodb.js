use('empresa')

/*db.ventas.insertMany([
    { producto: "Laptop", cantidad: 2, precio_unitario: 1200 },
    { producto: "Mouse", cantidad: 5, precio_unitario: 25 },
    { producto: "Laptop", cantidad: 1, precio_unitario: 1150 },
    { producto: "Teclado", cantidad: 3, precio_unitario: 75 },
    { producto: "Monitor", cantidad: 2, precio_unitario: 300 },
    { producto: "Mouse", cantidad: 10, precio_unitario: 20 }
]);*/

//Dejo la colección comentada para no estar agregando datos duplicados


//_id: = Criterio de agrupación, $sum: = Campo a sumar
db.ventas.aggregate([{
    $group: { _id: "$producto", total: {$sum: "$cantidad"}}
}])