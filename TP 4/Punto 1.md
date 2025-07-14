# Gestión de Proyectos y Empleados en Neo4j

## Punto 1: Creación de Datos en Neo4j

```cypher
// Crear departamentos
CREATE (d1:Departamento {nombre: "Recursos Humanos"})
CREATE (d2:Departamento {nombre: "Desarrollo"})
CREATE (d3:Departamento {nombre: "Marketing"})

// Crear empleados
CREATE (e1:Empleado {nombre: "Ana"})
CREATE (e2:Empleado {nombre: "Luis"})
CREATE (e3:Empleado {nombre: "Carla"})
CREATE (e4:Empleado {nombre: "Pedro"})
CREATE (e5:Empleado {nombre: "Marta"})
CREATE (e6:Empleado {nombre: "Jorge"})

// Asignar empleados a departamentos
CREATE (e1)-[:PERTENECE_A]->(d1)
CREATE (e2)-[:PERTENECE_A]->(d2)
CREATE (e3)-[:PERTENECE_A]->(d3)
CREATE (e4)-[:PERTENECE_A]->(d2)
CREATE (e5)-[:PERTENECE_A]->(d3)
CREATE (e6)-[:PERTENECE_A]->(d1)

// Crear proyectos
CREATE (p1:Proyecto {nombre: "Proyecto Apollo"})
CREATE (p2:Proyecto {nombre: "Proyecto Zeus"})

// Asignar empleados a proyectos con horas semanales
CREATE (e1)-[:TRABAJA_EN {horas: 20}]->(p1)
CREATE (e2)-[:TRABAJA_EN {horas: 30}]->(p1)
CREATE (e4)-[:TRABAJA_EN {horas: 10}]->(p1)
CREATE (e2)-[:TRABAJA_EN {horas: 15}]->(p2)
CREATE (e3)-[:TRABAJA_EN {horas: 25}]->(p2)
CREATE (e5)-[:TRABAJA_EN {horas: 20}]->(p2)
CREATE (e6)-[:TRABAJA_EN {horas: 10}]->(p2)

// Definir líderes de proyectos
CREATE (e1)-[:LIDERA]->(p1)
CREATE (e3)-[:LIDERA]->(p2)
```

## Punto 1: Consultas

###  Consulta 1: Obtener el nombre del proyecto, su líder y los empleados asignados

```cypher
MATCH (lider:Empleado)-[:LIDERA]->(p:Proyecto)
OPTIONAL MATCH (e:Empleado)-[:TRABAJA_EN]->(p)
WHERE e <> lider
RETURN 
  p.nombre AS proyecto,
  lider.nombre AS lider,
  collect(e.nombre) AS empleados_asignados;
```

### Consulta 2: Calcular el total de horas semanales por proyecto
```cypher
MATCH (e:Empleado)-[r:TRABAJA_EN]->(p:Proyecto)
RETURN 
  p.nombre AS Proyecto,
  sum(r.horas) AS TotalHorasSemanales;
```

### Consulta 3: Listar los empleados que trabajan en más de un proyecto

```cypher
MATCH (e:Empleado)-[:TRABAJA_EN]->(p:Proyecto)
WITH e, count(p) AS cantidadProyectos
WHERE cantidadProyectos > 1
RETURN e.nombre, cantidadProyectos;
```