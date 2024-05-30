<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "WiddleAdventure";

// Establecer conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los valores del formulario
$nombre = $_POST['nombre'];
$puntuacion = $_POST['puntuacion'];
$enemigos = $_POST['enemigos'];
$tiempo = $_POST['tiempo'];

// Preparar la consulta SQL
$sql = "INSERT INTO scoreboard (nombre, puntuacion, enemigos, tiempo) VALUES ('$nombre', '$puntuacion', '$enemigos', '$tiempo')";

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Datos enviados correctamente a la base de datos";
    // Redirigir a la página ../WiddleAdventure.html
    header("Location: ../WiddleAdventure.html");
    exit(); // Asegúrate de salir después de redirigir
} else {
    echo "Error al enviar datos a la base de datos: " . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
