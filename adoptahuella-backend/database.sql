CREATE TABLE usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  rol VARCHAR(20) NOT NULL DEFAULT 'Adoptante'
);

CREATE TABLE refugios (
  id_refugio SERIAL PRIMARY KEY,
  id_usuario INTEGER,
  nombre_fundacion VARCHAR(150) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  telefono_contacto VARCHAR(20),
  CONSTRAINT fk_refugio_usuario FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
    ON DELETE SET NULL
);

CREATE TABLE especies (
  id_especie SERIAL PRIMARY KEY,
  nombre_especie VARCHAR(50) NOT NULL,
  descripcion TEXT
);

CREATE TABLE mascotas (
  id_mascota SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  id_especie INTEGER NOT NULL,
  raza VARCHAR(100) NOT NULL,
  edad_meses INTEGER,
  genero VARCHAR(20) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'Disponible',
  id_refugio INTEGER,
  CONSTRAINT fk_mascota_especie FOREIGN KEY (id_especie)
    REFERENCES especies(id_especie)
    ON DELETE RESTRICT,
  CONSTRAINT fk_mascota_refugio FOREIGN KEY (id_refugio)
    REFERENCES refugios(id_refugio)
    ON DELETE CASCADE
);

INSERT INTO usuarios (nombre, correo, telefono, rol) VALUES
('Ana Gómez', 'ana@test.com', '3001234567', 'Adoptante'),
('Carlos Pérez', 'carlos@test.com', '3007654321', 'Refugio');

INSERT INTO refugios (id_usuario, nombre_fundacion, direccion, ciudad, telefono_contacto) VALUES
(2, 'Fundación Huellas', 'Calle 10 #20-30', 'Cali', '3007654321');

INSERT INTO especies (nombre_especie, descripcion) VALUES
('Perro', 'Animal doméstico canino'),
('Gato', 'Animal doméstico felino');

INSERT INTO mascotas (nombre, id_especie, raza, edad_meses, genero, estado, id_refugio) VALUES
('Rocky', 1, 'Criollo', 12, 'Macho', 'Disponible', 1),
('Mia', 2, 'Siames', 8, 'Hembra', 'Disponible', 1);