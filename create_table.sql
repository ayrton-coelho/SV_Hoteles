CREATE TABLE IF NOT EXISTS sv_hoteles_input (
    id CHAR(36) PRIMARY KEY,
    check_ VARCHAR(9) NOT NULL,
    hora VARCHAR(9) NOT NULL,
    fecha VARCHAR(10) NOT NULL,
    nro_habitacion INT NOT NULL,
    nro_personas INT NOT NULL,
    origen VARCHAR(30) NOT NULL
);