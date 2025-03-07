<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "registro_productos";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $bodegas = $pdo->query("SELECT DISTINCT bodega FROM producto")->fetchAll(PDO::FETCH_COLUMN);
    $sucursales = $pdo->query("SELECT DISTINCT sucursal FROM producto")->fetchAll(PDO::FETCH_COLUMN);
    $monedas = $pdo->query("SELECT DISTINCT moneda FROM producto")->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode([
        "bodegas" => $bodegas,
        "sucursales" => $sucursales,
        "monedas" => $monedas
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
