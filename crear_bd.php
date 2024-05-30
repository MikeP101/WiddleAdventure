<?php
$servername = "localhost";
$username = "root";
$password = "";

// Crear conexión
$conn = new mysqli($servername, $username, $password);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Crear la base de datos
$sql = "CREATE DATABASE IF NOT EXISTS WiddleAdventure";
if ($conn->query($sql) === TRUE) {
    echo "Base de datos creada exitosamente<br>";
} else {
    echo "Error al crear la base de datos: " . $conn->error;
}

// Seleccionar la base de datos
$conn->select_db("WiddleAdventure");

// SQL para crear la tabla
$sql = "CREATE TABLE IF NOT EXISTS scoreboard (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    puntuacion INT NOT NULL,
    enemigos INT NOT NULL,
    tiempo VARCHAR(30) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Tabla scoreboard creada exitosamente";
} else {
    echo "Error al crear la tabla: " . $conn->error;
}

$conn->close();
?>
