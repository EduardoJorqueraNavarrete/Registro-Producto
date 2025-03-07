<?php
header('Content-Type: application/json');
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "registro_productos";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["error" => "Método no permitido"]);
        exit;
    }

    $codigo = $_POST['codigo'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $bodega = $_POST['bodega'] ?? null;
    $sucursal = $_POST['sucursal'] ?? null;
    $moneda = $_POST['moneda'] ?? null;
    $precio = $_POST['precio'] ?? null;
    $descripcion = $_POST['descripcion'] ?? null;
    $materiales = isset($_POST['material']) ? implode(", ", $_POST['material']) : "";

    
    if (!$codigo || !$nombre || !$bodega || !$sucursal || !$moneda || !$precio || !$descripcion) {
        echo json_encode(["error" => "Todos los campos son obligatorios"]);
        exit;
    }

    $sql = "INSERT INTO producto (codigo, nombre, bodega, sucursal, moneda, precio, material, descripcion) 
            VALUES (:codigo, :nombre, :bodega, :sucursal, :moneda, :precio, :material, :descripcion)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':codigo' => $codigo,
        ':nombre' => $nombre,
        ':bodega' => $bodega,
        ':sucursal' => $sucursal,
        ':moneda' => $moneda,
        ':precio' => $precio,
        ':material' => $materiales,
        ':descripcion' => $descripcion
    ]);

    echo json_encode(["success" => "Producto agregado correctamente"]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
