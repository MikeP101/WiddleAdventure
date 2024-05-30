<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "widdleadventure";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos de la tabla scoreboard
$sql = "SELECT nombre, puntuacion, enemigos, tiempo FROM scoreboard ORDER BY puntuacion DESC";
$result = $conn->query($sql);

$scoreboard = array();
if ($result->num_rows > 0) {
    // Salida de cada fila
    while($row = $result->fetch_assoc()) {
        $scoreboard[] = $row;
    }
} else {
    $scoreboard = [];
}

header('Content-Type: application/json');
echo json_encode($scoreboard);

// Cerrar conexión
$conn->close();
?>
