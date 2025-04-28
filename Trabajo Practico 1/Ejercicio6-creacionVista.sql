CREATE VIEW ventas_mensuales AS
SELECT producto_id,
    DATE_FORMAT(fecha, '%Y-%m-01') AS mes,
    SUM(cantidad) AS total_vendido
FROM ventas
GROUP BY producto_id,
    mes;