/*
Deconstruir el array de valoraciones de productos para obtener una lista plana donde cada documento contenga una valoración individual.
Luego, agrupar por puntuación y contar cuántas valoraciones hay de cada puntuación.
*/


db.productos.aggregate([
    {$unwind: "$valoraciones"},
    {
        $group: {
            _id: "$valoraciones.puntuacion",
            valoraciones: {$sum: 1}
        }
    }
])


