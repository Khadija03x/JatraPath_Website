<?php
session_start();

/* =========================
   CORS
========================= */
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

/* =========================
   PREFLIGHT
========================= */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/* =========================
   DB
========================= */
include "../../config/db.php";

/* =========================
   GET DESTINATIONS
========================= */
$sql = "SELECT * FROM destinations ORDER BY id DESC";

$result = $conn->query($sql);

$destinations = [];

while ($row = $result->fetch_assoc()) {

    $destinations[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "location" => $row["location"],
        "price" => $row["price"],
        "days" => $row["days"],
        "image" => $row["image"],
        "description" => $row["description"]
    ];
}

/* =========================
   RESPONSE
========================= */
echo json_encode([
    "status" => "success",
    "destinations" => $destinations
]);

$conn->close();
?>