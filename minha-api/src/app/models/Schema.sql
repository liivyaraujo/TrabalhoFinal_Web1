DROP DATABASE IF EXISTS web1rep_2024;
CREATE DATABASE web1rep_2024;
USE web1rep_2024;

CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

INSERT INTO department (name, description)
VALUES 
    ('Engenharia', 'Departamento responsável pela infraestrutura'),
    ('Segurança', 'Departamento responsável pela segurança'),
    ('Financeiro', 'Departamento responsável pelo financeiro'),
    ('Desenvolvimento', 'Departamento responsável pelo desenvolvimento'),
    ('Secretaria', 'Departamento responsável pela secretaria')
;

CREATE TABLE IF NOT EXISTS employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    position VARCHAR(255),
    salary DECIMAL(10, 2),
    transportAllowance BOOLEAN,
    hireDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

SHOW TABLES;

SELECT * FROM department;