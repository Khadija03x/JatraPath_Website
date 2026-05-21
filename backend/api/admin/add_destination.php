<?php
session_start();

/* =========================
   CORS HEADERS
========================= */
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

/* =========================
   HANDLE PREFLIGHT
========================= */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* =========================
   DATABASE
========================= */
include "../../config/db.php";

/* =========================
   GET DATA
========================= */
$name = $_POST['name'] ?? '';
$location = $_POST['location'] ?? '';
$price = $_POST['price'] ?? '';
$days = $_POST['days'] ?? '';
$image = $_POST['image'] ?? '';

/* =========================
   INSERT
========================= */
$sql = "
INSERT INTO destinations
(name, location, price, days, image)
VALUES (?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssiis",
    $name,
    $location,
    $price,
    $days,
    $image
);

if ($stmt->execute()) {

    echo json_encode([
        "status" => "success"
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}
?>