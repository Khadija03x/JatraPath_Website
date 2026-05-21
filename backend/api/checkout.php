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

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "unauthorized"]);
    exit();
}

$user_id = $_SESSION['user_id'];

/* GET CART ITEMS */
$sql = "
SELECT c.destination_id, c.persons, d.price
FROM cart c
JOIN destinations d ON c.destination_id = d.id
WHERE c.user_id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

$items = [];
$total = 0;

while ($row = $result->fetch_assoc()) {
    $items[] = $row;
    $total += $row['price'] * $row['persons'];
}

if (count($items) === 0) {
    echo json_encode(["status" => "empty"]);
    exit();
}

/* CREATE ORDER */
$orderSql = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
$stmt2 = $conn->prepare($orderSql);
$stmt2->bind_param("ii", $user_id, $total);

if (!$stmt2->execute()) {
    echo json_encode(["status" => "error"]);
    exit();
}

$order_id = $stmt2->insert_id;

/* INSERT ORDER ITEMS */
$itemSql = "INSERT INTO order_items (order_id, destination_id, persons, price)
            VALUES (?, ?, ?, ?)";

$stmt3 = $conn->prepare($itemSql);

foreach ($items as $item) {
    $stmt3->bind_param(
        "iiii",
        $order_id,
        $item['destination_id'],
        $item['persons'],
        $item['price']
    );
    $stmt3->execute();
}

/* CLEAR CART */
$clearSql = "DELETE FROM cart WHERE user_id = ?";
$stmt4 = $conn->prepare($clearSql);
$stmt4->bind_param("i", $user_id);
$stmt4->execute();

echo json_encode([
    "status" => "success",
    "order_id" => $order_id,
    "total" => $total
]);
?>