INSERT INTO ventas (producto_id, cantidad, fecha)
VALUES (1, 10, CURDATE());
--Me figurara el siguiente error
--0	2	21:12:31	INSERT INTO ventas (producto_id, cantidad, fecha) VALUES (1, 10, CURDATE())	Error Code: 1142. INSERT command denied to user 'analista'@'localhost' for table 'ventas'	0.000 sec