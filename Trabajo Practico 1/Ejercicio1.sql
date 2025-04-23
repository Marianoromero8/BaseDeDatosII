-- DROP TABLE IF exists Alumnos;
CREATE TABLE Alumnos (
    ID_ALUMNO INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Edad INT
);

INSERT INTO Alumnos (ID_ALUMNO, Nombre, Edad) VALUES 
(1, 'Ana Pérez', 20),
(2, 'Carlos Rodríguez', 22),
(3, 'Lucía Gómez', 19),
(4, 'Marcos Díaz', 21),
(5, 'Elena Fernández', 23);

-- DROP TABLE IF exists Matriculas;
CREATE TABLE Matriculas (
    ID_MATRICULA INT PRIMARY KEY,
    Asignatura VARCHAR(100) NOT NULL,
    id_alumno INT,
    -- borrado TINYINT(1), -- (se usa para hacer un "borrado perezoso"
    FOREIGN KEY (id_alumno) REFERENCES Alumnos(ID_ALUMNO) ON DELETE RESTRICT
);

INSERT INTO Matriculas (ID_MATRICULA, Asignatura, id_alumno) VALUES 
(1, 'Matemáticas', 1),
(2, 'Historia', 2),
(3, 'Programación', 3),
(4, 'Biología', 4),
(5, 'Física', 5);

-- intentamos elminar el alumno con id=2
DELETE FROM Alumnos WHERE ID_ALUMNO = 2;

-- código de error al intentar borrar alumno con id=2:
-- DELETE FROM Alumnos WHERE ID_ALUMNO = 2	Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (bd2tp1.matriculas, CONSTRAINT matriculas_ibfk_1 FOREIGN KEY (id_alumno) REFERENCES alumnos (ID_ALUMNO) ON DELETE RESTRICT)	0.000 sec