<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/* =========================
   CORS
========================= */
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

/* PREFLIGHT */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "../config/db.php";

/* NOT LOGGED IN */
if (!isset($_SESSION['user_id'])) {

    echo json_encode([
        "status" => "not_logged_in"
    ]);

    exit();
}

$user_id = $_SESSION['user_id'];

/* =========================
   USER INFO
========================= */
$userQuery = $conn->prepare(
    "SELECT id, name, email
     FROM users
     WHERE id = ?"
);

$userQuery->bind_param("i", $user_id);

$userQuery->execute();

$userResult = $userQuery->get_result();

$user = $userResult->fetch_assoc();

/* =========================
   CART COUNT
========================= */        
$cartQuery = $conn->prepare(
    "SELECT COUNT(*) AS total
     FROM cart
     WHERE user_id = ?"
);

$cartQuery->bind_param("i", $user_id);

$cartQuery->execute();

$cartResult = $cartQuery->get_result();

$cartData = $cartResult->fetch_assoc();

/* =========================
   ORDERS COUNT
========================= */
$orderQuery = $conn->prepare(
    "SELECT COUNT(*) AS total
     FROM orders
     WHERE user_id = ?"
);

$orderQuery->bind_param("i", $user_id);

$orderQuery->execute();

$orderResult = $orderQuery->get_result();

$orderData = $orderResult->fetch_assoc();

/* =========================
   RESPONSE
========================= */
echo json_encode([

    "status" => "success",

    "user" => $user,

    "stats" => [

        "orders" => (int)($orderData['total'] ?? 0),

        "cart_items" => (int)($cartData['total'] ?? 0)
    ]
]);
?>