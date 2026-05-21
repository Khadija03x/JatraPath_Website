<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../config/db.php";

/* CHECK LOGIN */
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "User not logged in"
    ]);
    exit();
}

$user_id = $_SESSION['user_id'];

$title = $_POST['title'] ?? '';
$price = (int)($_POST['price'] ?? 0);
$category = $_POST['category'] ?? '';

if (!$title || !$price || !$category) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing fields"
    ]);
    exit();
}

/* 1. INSERT ORDER */
$sql = "INSERT INTO giftcard_orders (user_id, title, category, price)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("issi", $user_id, $title, $category, $price);

if ($stmt->execute()) {

    /* 2. ADD TO USER WALLET (IMPORTANT FIX) */
    $giftcard_id = $stmt->insert_id;

    $sql2 = "INSERT INTO user_giftcards (user_id, giftcard_id)
             VALUES (?, ?)";

    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("ii", $user_id, $giftcard_id);
    $stmt2->execute();

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