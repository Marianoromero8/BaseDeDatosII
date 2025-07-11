//Creamos 3 alumnos

CREATE (:Estudiante {nombre: 'Marcos'}), (:Estudiante {nombre: 'Luciano'}), (:Estudiante {nombre: 'Milena'})

//Creamos las materias

CREATE (:Materia {nombre: 'Literatura'}), (:Materia {nombre: 'Matematica'}), (:Materia {nombre: 'Fisica'}), (:Materia {nombre: 'Quimica'})

//Creamos los cursos

CREATE (:Curso {salon: 'A'}), (:Curso {salon: 'B'}), (:Curso {salon: 'C'}), (:Curso {salon: 'D'})

//Hacemos las relacion de cursos y materias

MATCH (cursoA:Curso {salon: 'A'}), (lit:Materia {nombre: 'Literatura'}) CREATE (cursoA)-[:PERTENECE_A]->(lit);

MATCH (cursoB:Curso {salon: 'B'}), (mat:Materia {nombre: 'Matematica'}) CREATE (cursoB)-[:PERTENECE_A]->(mat);

MATCH (cursoC:Curso {salon: 'C'}), (fis:Materia {nombre: 'Fisica'}) CREATE (cursoC)-[:PERTENECE_A]->(fis)

//Hacemos un preerequisito

