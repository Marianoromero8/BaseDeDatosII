# Trabajo Practico 1 Base De Datos II

## Ejercicio 1.
**Código al intentar borrar alumno con id=2 y su respectivo error**

```sql
DELETE FROM Alumnos WHERE ID_ALUMNO = 2;

Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (bd2tp1.matriculas, CONSTRAINT matriculas_ibfk_1 FOREIGN KEY (id_alumno) REFERENCES alumnos (ID_ALUMNO) ON DELETE RESTRICT)
0.000 sec
```

## Ejercicio 2.

**Código al intentar insertar un dato inválido y su respectivo error**

```sql
INSERT INTO MatriculasEstudiantes (ID_MATRICULA, Asignatura, id_alumno) VALUES (1, 'Matemáticas', 999);

Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (bd2tp1.matriculasestudiantes)
```

## Ejercicio3.
### ReadCommitted
En el Read Committed cada SELECT ve solo datos que ya fueron confirmados por otras transacciones, osea por ejemplo dos usuarios pueden ver el mismo valor antes de modificarlo y el ultimo en hacer el COMMIT sobreescribe el cambio del otro sin darse cuenta


### Serializable
El serializable es mas estricto porque bloquea cualquier operacion que pueda causar inconsistencia, osea  Si un usuario lee y esta modificando una fila , otro usuario B que quiere modificar esa fila debe esperar a que A termine  antes de acceder a esa misma fila.



## Ejercicio 6.
Primero creo la vista que resuma las ventas mensuales
![Creacion Vista](https://github.com/user-attachments/assets/2ec76833-79f8-4f41-a0e8-55d56bfbf72a)

Luego pido los 5 productos mas vendidos a traves de un llamado agrupandolos y limitandolo a 5.
![Devuelve Productos Mas Vendidos](https://github.com/user-attachments/assets/40a4ebf4-2a76-4546-a9ee-db9e09f8cebe)

## Ejercicio 7.
Primero creo al usuario con su contraseña desde el servidor donde me encuentro que es el local
![Creo usuario analista + contraseña](https://github.com/user-attachments/assets/70ad48fe-7c84-474d-9c64-1fe833fb587d)

Luego le doy el permiso para poder ver los productos, por lo tanto no va a poder editar, insertar o borrar de la tabla
![Le doy permiso solo para ver](https://github.com/user-attachments/assets/1cfc8ce8-fd6f-4e3a-9118-0b05dfc71232)

En la siguiente foto se ve como desde el usuario analista intento insertar datos y me lo niega. Previamente si pudo ver 5 productos ya que ese permiso lo tiene.
![Intento de insertar data](https://github.com/user-attachments/assets/db842568-60c3-4731-82bb-93ac1cf85a0a)


## Ejercicio 8
#### A continuación la creación de los triggers que modifican la tabla "auditorías" cada vez que se hace CRUD en la tabla clientes:
![Insert](https://raw.githubusercontent.com/Marianoromero8/BaseDeDatosII/refs/heads/main/Trabajo%20Practico%201/Ejercicio8-A.png)
![Eliminar](https://raw.githubusercontent.com/Marianoromero8/BaseDeDatosII/refs/heads/main/Trabajo%20Practico%201/Ejercicio8-B.png)
![Actualizar](https://raw.githubusercontent.com/Marianoromero8/BaseDeDatosII/refs/heads/main/Trabajo%20Practico%201/Ejercicio8-C.png)
#### Al ver la tabla 'Auditorías' con los valores id (autoincremental) accion y fecha, se observa como efectivamente, los triggers funcionan ante cada acción CRUD
![crud](https://raw.githubusercontent.com/Marianoromero8/BaseDeDatosII/refs/heads/main/Trabajo%20Practico%201/Ejercicio8-D.png)

## Ejercicio 9

```sql
// Primero Creamos la base de datos
CREATE DATABASE Negocio;

// Ahora Creamos la tabla
CREATE TABLE Clientes (
    clienteid INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    edad INT
);

// Insertamos los datos
INSERT INTO Clientes (nombre, edad) VALUES
('dibu martinez', 35),
('enzo ferandez', 23),
('lionel messi' , 37);

// Hacemos el backup
mysqldump -u root -p Negocio > backup.sql

// Simulamos la perdida de estos datos
DROP DATABASE Negocio;

// Ahora Restauramos la base de datos perdida
mysql -u root -p Negocio < backup.sql
```
