SELECT id_producto,
    nombre_producto,
    SUM(total_vendida) AS cantidad_total
FROM ventas_mensuales_por_producto
GROUP BY id_producto,
    nombre_producto
ORDER BY cantidad_total DESC
LIMIT 5;