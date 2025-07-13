### Creo la tabla con los empleados
```CREATE (:Empleado {nombre: 'Mariano'}), (:Empleado {nombre: 'Franco'}), (:Empleado {nombre: 'Julian'});```

### Creo los departamentos con sus respectivos nombres
```CREATE (:Departamento {nombre: 'IT'}), (:Departamento {nombre: 'Project Manager'}), (:Departamento {nombre: 'Recursos Humanos'});```

### Creo las relaciones de cada empleado con su departamentos

```MATCH (julian:Empleado {nombre: 'Julian'}), (rh:Departamento {nombre: 'Recursos Humanos'}) CREATE (julian)-[:PERTENECE_A]->(rh)```

```MATCH (mariano:Empleado {nombre: 'Mariano'}), (it:Departamento {nombre: 'IT'}) CREATE (mariano)-[:PERTENECE_A]->(it);```

```MATCH (franco:Empleado {nombre: 'Franco'}), (pm:Departamento {nombre: 'Project Manager'}) CREATE (franco)-[:PERTENECE_A]->(pm);```

### Creamos los proyectos
```CREATE (proyecto1:Proyecto {nombre: 'Carrito de compras'}), (proyecto2:Proyecto {nombre: 'Single Page Application'})```

### Luego relacionamos los empleados con los proyectos

```MATCH (mariano:Empleado {nombre: 'Mariano'}), (proyecto1:Proyecto {nombre: 'Carrito de compras'}) CREATE (mariano)-[:ASIGNADO_A {horas: 48}]->(proyecto1);```

```MATCH (franco:Empleado {nombre: 'Franco'}), (proyecto1:Proyecto {nombre: 'Carrito de compras'}), (proyecto2:Proyecto {nombre: 'Single Page Application'}) CREATE (franco)-[:ASIGNADO_A {horas: 24}]->(proyecto1), (franco)-[:ASIGNADO_A {horas: 24}]->(proyecto2)```

```MATCH (julian:Empleado {nombre: 'Julian'}), (proyecto1:Proyecto {nombre: 'Carrito de compras'}), (proyecto2:Proyecto {nombre: 'Single Page Application'}) CREATE (julian)-[:ASIGNADO_A {horas: 16}]->(proyecto1), (julian)-[:ASIGNADO_A {horas: 10}]->(proyecto2)```

### Ponemos a un Empleado a cargo de un Proyecto

```MATCH (mariano:Empleado {nombre: 'Mariano'}), (proyecto1:Proyecto {nombre: 'Carrito de compras'}) CREATE (mariano)-[:LIDERA]->(proyecto1);```

```MATCH (franco:Empleado {nombre: 'Franco'}), (proyecto2:Proyecto {nombre: 'Single Page Application'}) CREATE (franco)-[:LIDERA]->(proyecto2)```

# Consultas

### Obtener el nombre del proyecto, su líder y los empleados asignados

```MATCH (p:Proyecto)```
```OPTIONAL MATCH (l:Empleado)-[:LIDERA]->(p)```
```OPTIONAL MATCH (e:Empleado)-[:ASIGNADO_A]->(p)```
```RETURN p.nombre AS Proyecto, l.nombre AS Lider, collect(e.nombre) AS EmpleadosAsignados```

### Calcular el total de horas semanales por proyecto

```MATCH (e:Empleado)-[r:ASIGNADO_A]->(p:Proyecto)```
```RETURN p.nombre AS Proyecto, SUM(r.horas) AS TotalHorasSemanales;```

### Listar los empleados que trabajan en más de un proyecto

```MATCH (e:Empleado)-[:ASIGNADO_A]->(p:Proyecto) WITH e, COUNT(DISTINCT p) AS CantidadProyectos WHERE CantidadProyectos > 1 RETURN e.nombre AS Empleado, CantidadProyectos```