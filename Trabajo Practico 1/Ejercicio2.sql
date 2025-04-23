DROP TABLE IF exists Estudiantes;
CREATE TABLE Estudiantes (
    ID_ALUMNO INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

INSERT INTO Estudiantes (ID_ALUMNO, Nombre) VALUES
(1, 'Ana'),
(2, 'Luis');

DROP TABLE IF exists MatriculasEstudiantes;
CREATE TABLE MatriculasEstudiantes (
    ID_MATRICULA INT PRIMARY KEY,
    Asignatura VARCHAR(100) NOT NULL,
    id_alumno INT,
    FOREIGN KEY (id_alumno) REFERENCES Alumnos(ID_ALUMNO)
);

INSERT INTO MatriculasEstudiantes (ID_MATRICULA, Asignatura, id_alumno) VALUES
(1, 'Matemáticas', 999);

-- codigo error al intentar insertar un dato invalido:
-- INSERT INTO MatriculasEstudiantes (ID_MATRICULA, Asignatura, id_alumno) VALUES (1, 'Matemáticas', 999)	Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (bd2tp1.matriculasestudiantes, CONSTRAINT matriculasestudiantes_ibfk_1 FOREIGN KEY (id_alumno) REFERENCES alumnos (ID_ALUMNO))	0.000 sec