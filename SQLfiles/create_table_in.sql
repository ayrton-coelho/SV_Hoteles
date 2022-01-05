CREATE TABLE IF NOT EXISTS sv_hotel_in (
  id CHAR(36) NOT NULL,
  hora VARCHAR(9) NOT NULL,
  fecha DATE NOT NULL,
  nro_habitacion INT NOT NULL,
  nro_personas INT NOT NULL,
  puerto VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);