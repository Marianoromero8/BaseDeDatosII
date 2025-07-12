##  Punto 4: Gestión de Estudiantes, Materias y Cursos

###  Creación de Datos en Neo4j 

```cypher
// =======================
// Crear Estudiantes
// =======================
CREATE (es1:Estudiante {nombre: "Ana"});
CREATE (es2:Estudiante {nombre: "Luis"});
CREATE (es3:Estudiante {nombre: "Carla"});
CREATE (es4:Estudiante {nombre: "Pedro"});
CREATE (es5:Estudiante {nombre: "Marta"});
CREATE (es6:Estudiante {nombre: "Jorge"});

// =======================
// Crear Materias
// =======================
CREATE (m1:Materia {nombre: "Matemáticas"});
CREATE (m2:Materia {nombre: "Programación"});
CREATE (m3:Materia {nombre: "Bases de Datos"});
CREATE (m4:Materia {nombre: "Sistemas Operativos"});
CREATE (m5:Materia {nombre: "Redes"});

// =======================
// Crear Prerrequisito
// =======================
MATCH (m5:Materia {nombre: "Redes"}), (m4:Materia {nombre: "Sistemas Operativos"})
CREATE (m5)-[:PRERREQUISITO]->(m4);

// =======================
// Crear Cursos
// =======================
CREATE (c1:Curso {codigo: "MATH101", nombre: "Matemáticas Básicas"});
CREATE (c2:Curso {codigo: "PROG201", nombre: "Programación I"});
CREATE (c3:Curso {codigo: "BD301", nombre: "Bases de Datos Avanzadas"});
CREATE (c4:Curso {codigo: "SO401", nombre: "Sistemas Operativos"});
CREATE (c5:Curso {codigo: "RED501", nombre: "Redes de Computadoras"});
CREATE (c6:Curso {codigo: "PROG202", nombre: "Programación II"});

// =======================
// Relacionar Cursos con Materias
// =======================
MATCH (c1:Curso {codigo: "MATH101"}), (m1:Materia {nombre: "Matemáticas"})
CREATE (c1)-[:CORRESPONDE_A]->(m1);

MATCH (c2:Curso {codigo: "PROG201"}), (m2:Materia {nombre: "Programación"})
CREATE (c2)-[:CORRESPONDE_A]->(m2);

MATCH (c3:Curso {codigo: "BD301"}), (m3:Materia {nombre: "Bases de Datos"})
CREATE (c3)-[:CORRESPONDE_A]->(m3);

MATCH (c4:Curso {codigo: "SO401"}), (m4:Materia {nombre: "Sistemas Operativos"})
CREATE (c4)-[:CORRESPONDE_A]->(m4);

MATCH (c5:Curso {codigo: "RED501"}), (m5:Materia {nombre: "Redes"})
CREATE (c5)-[:CORRESPONDE_A]->(m5);

MATCH (c6:Curso {codigo: "PROG202"}), (m2:Materia {nombre: "Programación"})
CREATE (c6)-[:CORRESPONDE_A]->(m2);

// =======================
// Inscripciones y Calificaciones
// =======================

// Ana
MATCH (e:Estudiante {nombre: "Ana"}), (c:Curso {codigo: "MATH101"})
CREATE (e)-[:INSCRITO_EN {calificacion: 85}]->(c);
MATCH (e:Estudiante {nombre: "Ana"}), (c:Curso {codigo: "PROG201"})
CREATE (e)-[:INSCRITO_EN {calificacion: 90}]->(c);

// Luis
MATCH (e:Estudiante {nombre: "Luis"}), (c:Curso {codigo: "PROG201"})
CREATE (e)-[:INSCRITO_EN {calificacion: 75}]->(c);
MATCH (e:Estudiante {nombre: "Luis"}), (c:Curso {codigo: "BD301"})
CREATE (e)-[:INSCRITO_EN {calificacion: 80}]->(c);
MATCH (e:Estudiante {nombre: "Luis"}), (c:Curso {codigo: "PROG202"})
CREATE (e)-[:INSCRITO_EN {calificacion: 78}]->(c);

// Carla
MATCH (e:Estudiante {nombre: "Carla"}), (c:Curso {codigo: "MATH101"})
CREATE (e)-[:INSCRITO_EN {calificacion: 92}]->(c);
MATCH (e:Estudiante {nombre: "Carla"}), (c:Curso {codigo: "SO401"})
CREATE (e)-[:INSCRITO_EN {calificacion: 88}]->(c);

// Pedro
MATCH (e:Estudiante {nombre: "Pedro"}), (c:Curso {codigo: "SO401"})
CREATE (e)-[:INSCRITO_EN {calificacion: 75}]->(c);
MATCH (e:Estudiante {nombre: "Pedro"}), (c:Curso {codigo: "BD301"})
CREATE (e)-[:INSCRITO_EN {calificacion: 65}]->(c);

// Marta
MATCH (e:Estudiante {nombre: "Marta"}), (c:Curso {codigo: "PROG201"})
CREATE (e)-[:INSCRITO_EN {calificacion: 82}]->(c);
MATCH (e:Estudiante {nombre: "Marta"}), (c:Curso {codigo: "RED501"})
CREATE (e)-[:INSCRITO_EN {calificacion: 69}]->(c);

// Jorge
MATCH (e:Estudiante {nombre: "Jorge"}), (c:Curso {codigo: "SO401"})
CREATE (e)-[:INSCRITO_EN {calificacion: 90}]->(c);
```

## Punto 4: Consultas

###  Consulta 1: Transcripción académica de un estudiante

```cypher
MATCH (es:Estudiante {nombre: "Ana"})-[ins:INSCRITO_EN]->(c:Curso)
MATCH (c)-[:CORRESPONDE_A]->(m:Materia)
RETURN 
  es.nombre AS Estudiante,
  c.codigo AS CodigoCurso, 
  c.nombre AS NombreCurso,
  m.nombre AS Materia,
  ins.calificacion AS Calificacion;
```

### Consulta 2: Verificar si un estudiante puede inscribirse en una materia (prerrequisitos)

```cypher
MATCH (mObjetivo:Materia {nombre: "Redes"})-[:PRERREQUISITO]->(mPrereq:Materia)
MATCH (cPrereq:Curso)-[:CORRESPONDE_A]->(mPrereq)
OPTIONAL MATCH (e:Estudiante {nombre: "Pedro"})-[ins:INSCRITO_EN]->(cPrereq)
RETURN 
  mObjetivo.nombre AS MateriaObjetivo,
  mPrereq.nombre AS Prerrequisito,
  CASE 
    WHEN ins.calificacion >= 70 THEN "Aprobado"
    WHEN ins.calificacion < 70 THEN "Reprobado"
    ELSE "No cursado"
  END AS EstadoPrerrequisito;
```

### Consulta 3: Promedio de calificaciones por estudiante

```cypher
MATCH (e:Estudiante)-[i:INSCRITO_EN]->(c:Curso)
RETURN 
  e.nombre AS Estudiante, 
  AVG(i.calificacion) AS Promedio;
```

### Consulta 4: Materias con promedio inferior a 70 (como la calificacion es de 0 a 100)

```cypher
MATCH (m:Materia)<-[:CORRESPONDE_A]-(c:Curso)
WITH m, c
MATCH (c)<-[i:INSCRITO_EN]-(:Estudiante)
WITH m.nombre AS Materia, AVG(i.calificacion) AS Promedio
WHERE Promedio < 70
RETURN Materia, ROUND(Promedio, 2) AS Promedio;
```