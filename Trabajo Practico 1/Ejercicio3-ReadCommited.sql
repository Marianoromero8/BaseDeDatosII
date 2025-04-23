Table Cuentas {
  id int [pk]
  saldo decimal
}

CREATE TABLE Cuentas (
  id INT PRIMARY KEY,
  saldo DECIMAL(10,2)
);

INSERT INTO Cuentas (id, saldo) VALUES (1, 1000.00);

-- Usuario A 
-- Inicia transacción
START TRANSACTION;

-- Lee el saldo
SELECT Saldo FROM CuentaBancaria WHERE ID_CUENTA = 1;  -- devuelve 1000.00

-- (pausa antes de actualizar)

-- Usuario B
START TRANSACTION;

-- Lee el saldo
SELECT Saldo FROM CuentaBancaria WHERE ID_CUENTA = 1;  -- también ve 1000.00

-- Resta 100 y actualiza
UPDATE CuentaBancaria SET Saldo = 900.00 WHERE ID_CUENTA = 1;

COMMIT; -- Usuario B termina

-- Usuario A sigue:
-- También cree que el saldo era 1000, así que resta 100
UPDATE CuentaBancaria SET Saldo = 900.00 WHERE ID_CUENTA = 1;

COMMIT;

--Resultado final: ¡El saldo sigue en 900! Pero se retiraron dos veces 100, así que falta dinero (debería haber terminado en 800)
--Esto es un problema de concurrencia, común en READ COMMITTED o READ UNCOMMITTED, donde cada usuario ve los datos más recientes comprometidos, pero no se controla el "choque" de decisiones.