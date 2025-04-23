--Creo usuario llamado analista
CREATE USER analista IDENTIFIED BY 'analista123';
--Doy permiso
GRANT SELECT ON ventas,
    productos TO analista;
--Inserto datos
INSERT INTO ventas (id_producto, fecha, cantidad)
VALUES (1, CURRENT_DATE, 5);
--Error
--ERROR 1142 (42000): INSERT command denied to user 'analista' for table 'ventas'