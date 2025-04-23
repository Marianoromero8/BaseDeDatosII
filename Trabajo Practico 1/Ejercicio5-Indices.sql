CREATE INDEX idx_categoria ON Productos(categoria);
CREATE INDEX idx_nombre ON Productos(nombre);
CREATE INDEX idx_categoria_nombre ON Productos(categoria, nombre);