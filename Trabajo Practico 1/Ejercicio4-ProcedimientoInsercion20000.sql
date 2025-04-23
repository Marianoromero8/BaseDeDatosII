DELIMITER $$

CREATE PROCEDURE insertar_productos()
BEGIN
    DECLARE i INT DEFAULT 1;

    WHILE i <= 20000 DO
        INSERT INTO productos (
            id, nombre, descripcion, precio, stock, categoria, marca, fecha_creacion
        )
        VALUES (
            i,
            CONCAT('Producto ', i),
            CONCAT('Descripción del producto ', i),
            ROUND(RAND() * 1000, 2),
            FLOOR(RAND() * 100),
            CONCAT('Categoría ', FLOOR(1 + RAND() * 10)),
            CONCAT('Marca ', FLOOR(1 + RAND() * 5)),
            CURDATE()
        );
        SET i = i + 1;
    END WHILE;
END$$

DELIMITER ;

-- Ejecuta el procedimiento
CALL insertar_productos();