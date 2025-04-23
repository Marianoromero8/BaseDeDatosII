CREATE VIEW ventas_mensuales_por_producto AS
SELECT v.id_producto,
    p.nombre AS nombre_producto,
    DATE_TRUNC('month', v.fecha) AS mes,
    SUM(v.cantidad) AS total_vendido
FROM ventas v
    JOIN productos p ON v.id_producto = p.id
GROUP BY v.id_producto,
    p.nombre,
    DATE_TRUNC('month', v.fecha);