<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
include "../config/db.php";

/* CHECK LOGIN */
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "unauthorized"]);
    exit();
}

$user_id = $_SESSION['user_id'];

/* ADMIN INFO */
$stmt = $conn->prepare("SELECT id, name, email FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$admin = $stmt->get_result()->fetch_assoc();

/* TOTAL USERS (EXCLUDE ADMIN) */
$userSql = "SELECT COUNT(*) as total FROM users WHERE role = 'user'";
$userCount = $conn->query($userSql)->fetch_assoc();

/* DESTINATIONS */
$destSql = "SELECT COUNT(*) as total FROM destinations";
$destCount = $conn->query($destSql)->fetch_assoc();

/* ORDERS */
$orderSql = "SELECT COUNT(*) as total FROM orders WHERE user_id = $user_id";
$orderCount = $conn->query($orderSql)->fetch_assoc();

/* CART ITEMS */
$cartSql = "SELECT COUNT(*) as total FROM cart WHERE user_id = $user_id";
$cartCount = $conn->query($cartSql)->fetch_assoc();

/* 🎁 REAL GIFT CARDS */
$giftSql = "
SELECT COUNT(*) as total
FROM user_giftcards
WHERE user_id = ?
";

$stmt = $conn->prepare($giftSql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$giftCount = $stmt->get_result()->fetch_assoc();

/* RESPONSE */
echo json_encode([
    "status" => "success",
    "user" => $admin,
    "stats" => [
        "users" => (int)$userCount['total'],
        "destinations" => (int)$destCount['total'],
        "orders" => (int)$orderCount['total'],
        "cart_items" => (int)$cartCount['total'],
        "giftcards" => (int)$giftCount['total']
    ]
]);
?>