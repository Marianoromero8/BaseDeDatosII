-- Consulta sin índice:
EXPLAIN SELECT * FROM Productos WHERE categoria = 'Categoría 2';

-- Crear índice
CREATE INDEX idx_categoria ON Productos(categoria);

-- Consulta con índice:
EXPLAIN SELECT * FROM Productos WHERE categoria = 'Categoría 2';