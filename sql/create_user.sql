CREATE USER IF NOT EXISTS 'ayrton'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'ayrton'@'localhost';
FLUSH PRIVILEGES;