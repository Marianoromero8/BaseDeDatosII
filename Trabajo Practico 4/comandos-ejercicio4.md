//Creamos 3 alumnos

CREATE (:Estudiante {nombre: 'Marcos'}), (:Estudiante {nombre: 'Luciano'}), (:Estudiante {nombre: 'Milena'})

//Creamos las materias

CREATE (:Materia {nombre: 'Literatura'}), (:Materia {nombre: 'Matematica'}), (:Materia {nombre: 'Fisica'})

//Creamos los cursos

CREATE (:Curso {salon: 'A'}), (:Curso {salon: 'B'}), (:Curso {salon: 'C'}), (:Curso {salon: 'D'})

//Hacemos las relacion de cursos y materias

MATCH (cursoA:Curso {salon: 'A'}), (lit:Materia {nombre: 'Literatura'}) CREATE (cursoA)-[:PERTENECE_A]->(lit);

MATCH (cursoB:Curso {salon: 'B'}), (mat:Materia {nombre: 'Matematica'}) CREATE (cursoB)-[:PERTENECE_A]->(mat);

MATCH (cursoC:Curso {salon: 'C'}), (fis:Materia {nombre: 'Fisica'}) CREATE (cursoC)-[:PERTENECE_A]->(fis)

//Hacemos un preerequisito

MATCH (fis:Materia {nombre: 'Fisica'}), (mat:Materia {nombre: 'Matematica'}) CREATE (fis)-[:PRERREQUISITO]->(mat)

//Inscripcio estudiantes

MATCH (marcos:Estudiante {nombre: 'Marcos'}), (cursoA:Curso {salon: 'A'}) CREATE (marcos)-[:INSCRIPTO {nota: 8.5}]->(cursoA);

MATCH (milena:Estudiante {nombre: 'Milena'}), (cursoB:Curso {salon: 'B'}) CREATE (milena)-[:INSCRIPTO {nota: 9}]->(cursoB);

MATCH (luciano:Estudiante {nombre: 'Luciano'}), (cursoA:Curso {salon: 'A'}) CREATE (luciano)-[:INSCRIPTO {nota: 4}]->(cursoA);

MATCH (milena:Estudiante {nombre: 'Milena'}), (cursoC:Curso {salon: 'C'}) CREATE (milena)-[:INSCRIPTO {nota: 7}]->(cursoC);

MATCH (marcos:Estudiante {nombre: 'Marcos'}), (cursoB:Curso {salon: 'B'}) CREATE (marcos)-[:INSCRIPTO {nota: 6}]->(cursoB);

MATCH (luciano:Estudiante {nombre: 'Luciano'}), (cursoB:Curso {salon: 'B'}) CREATE (luciano)-[:INSCRIPTO {nota: 6}]->(cursoB);