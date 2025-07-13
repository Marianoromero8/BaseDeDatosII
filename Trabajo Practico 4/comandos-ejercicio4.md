### Creamos 3 alumnos

```CREATE (:Estudiante {nombre: 'Marcos'}), (:Estudiante {nombre: 'Luciano'}), (:Estudiante {nombre: 'Milena'})```

### Creamos las materias

```CREATE (:Materia {nombre: 'Literatura'}), (:Materia {nombre: 'Matematica'}), (:Materia {nombre: 'Fisica'})```

## Creamos los cursos

```CREATE (:Curso {salon: 'A'}), (:Curso {salon: 'B'}), (:Curso {salon: 'C'}), (:Curso {salon: 'D'})```

### Hacemos las relacion de cursos y materias

```MATCH (cursoA:Curso {salon: 'A'}), (lit:Materia {nombre: 'Literatura'}) CREATE (cursoA)-[:PERTENECE_A]->(lit);```

```MATCH (cursoB:Curso {salon: 'B'}), (mat:Materia {nombre: 'Matematica'}) CREATE (cursoB)-[:PERTENECE_A]->(mat);```

```MATCH (cursoC:Curso {salon: 'C'}), (fis:Materia {nombre: 'Fisica'}) CREATE (cursoC)-[:PERTENECE_A]->(fis)```

### Hacemos un preerequisito

```MATCH (fis:Materia {nombre: 'Fisica'}), (mat:Materia {nombre: 'Matematica'}) CREATE (fis)-[:PRERREQUISITO]->(mat)```

### Inscripcion estudiantes

``` MATCH (marcos:Estudiante {nombre: 'Marcos'}), (cursoA:Curso {salon: 'A'}) CREATE (marcos)-[:INSCRIPTO {nota: 8.5}]->(cursoA);```

```MATCH (milena:Estudiante {nombre: 'Milena'}), (cursoB:Curso {salon: 'B'}) CREATE (milena)-[:INSCRIPTO {nota: 9}]->(cursoB);```

```MATCH (luciano:Estudiante {nombre: 'Luciano'}), (cursoA:Curso {salon: 'A'}) CREATE (luciano)-[:INSCRIPTO {nota: 4}]->(cursoA);```

```MATCH (milena:Estudiante {nombre: 'Milena'}), (cursoC:Curso {salon: 'C'}) CREATE (milena)-[:INSCRIPTO {nota: 7}]->(cursoC);```

```MATCH (marcos:Estudiante {nombre: 'Marcos'}), (cursoB:Curso {salon: 'B'}) CREATE (marcos)-[:INSCRIPTO {nota: 6}]->(cursoB);```

```MATCH (luciano:Estudiante {nombre: 'Luciano'}), (cursoB:Curso {salon: 'B'}) CREATE (luciano)-[:INSCRIPTO {nota: 6}]->(cursoB);```


# Consultas

### Listar la transcripción académica de un estudiante

```MATCH (estudiante:Estudiante {nombre: 'Marcos'})-[insc:INSCRIPTO]->(curso:Curso)-[:PERTENECE_A]->(materia:Materia) RETURN estudiante.nombre AS NombreEstudiante, materia.nombre AS Materia, insc.nota AS Nota```

### Verificar si un estudiante puede inscribirse en una materia

```MATCH (estudiante:Estudiante {nombre: 'Luciano'}), (materia:Materia {nombre: 'Fisica'})-[:PRERREQUISITO]->(pre:Materia)<-[:PERTENECE_A]-(curso:Curso)<-[insc:INSCRIPTO]-(estudiante) RETURN estudiante.nombre AS Nombre, pre.nombre AS PRERREQUISITO, insc.nota AS Nota, insc.nota >= 6 AS Aprobado, insc.nota < 6 AS Desaprobado```

### Calcular el promedio de calificaciones por estudiante

```MATCH (estudiante:Estudiante)-[inscr:INSCRIPTO]->(curso:Curso) RETURN estudiante.nombre AS nombre, AVG(inscr.nota) AS PromedioNotas```

### Detectar materias con promedio inferior a 7.

```MATCH (estudiante:Estudiante)-[insc:INSCRIPTO]->(curso:Curso)-[:PERTENECE_A]->(materia:Materia) RETURN materia.nombre, AVG(insc.nota) AS Nota, AVG(insc.nota) < 7 AS PromedioMenorA7```