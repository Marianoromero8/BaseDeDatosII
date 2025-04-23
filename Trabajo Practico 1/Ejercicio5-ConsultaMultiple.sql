SELECT * FROM productos
WHERE categoria = 'Categoría 3'
  AND marca = 'Marca 2'
  AND precio BETWEEN 100 AND 500
  AND stock > 90;
