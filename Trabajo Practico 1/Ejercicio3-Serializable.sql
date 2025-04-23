Table Cuentas {
  id int [pk]
  saldo decimal
}

CREATE TABLE Cuentas (
  id INT PRIMARY KEY,
  saldo DECIMAL(10,2)
);

INSERT INTO Cuentas (id, saldo) VALUES (1, 1000.00);
 +54 9 2916 43-4294: Serializable:
-- Usuario A
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;

SELECT Saldo FROM CuentaBancaria WHERE ID_CUENTA = 1;
-- devuelve 1000.00

-- Usuario B
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;

SELECT Saldo FROM CuentaBancaria WHERE ID_CUENTA = 1;
-- ❌ Espera o da error, porque A ya tiene un lock de tipo serializable
 --Usuario B no podrá leer ni actualizar hasta que A termine. Esto garantiza una ejecución como si las transacciones ocurrieran en serie, evitando conflictos.
--✅ Resultado final:
--Si A actualiza primero a 900,
--B luego verá el saldo actualizado y lo llevará a 800.
--El resultado es correcto y consistente.


--el serializable en cambio es mas estricto porque bloquea cualquier operacion que pueda causar inconsistencia, osea  Si un usuario lee y esta modificando una fila , otro usuario B que quiere modificar esa fila debe esperar a que A termine  antes de acceder a esa misma fila.