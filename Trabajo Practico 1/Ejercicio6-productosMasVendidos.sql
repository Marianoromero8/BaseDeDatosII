SELECT producto_id,
    SUM(total_vendido) AS ventas_totales
FROM ventas_mensuales
GROUP BY producto_id
ORDER BY ventas_totales DESC
LIMIT 5;