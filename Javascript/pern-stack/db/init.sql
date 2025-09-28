CREATE DATABASE pern IF NOT EXISTS;
USE pern;

CREATE TABLE tareas (
    tarea_id SERIAL PRIMARY KEY, 
    titulo VARCHAR(255) NOT NULL, 
    descripcion TEXT,
    actualizada BOOLEAN DEFAULT false
    )