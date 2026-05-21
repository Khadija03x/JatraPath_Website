<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
include "../config/db.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "unauthorized"]);
    exit();
}

$user_id = $_SESSION['user_id'];

$sql = "
SELECT 
    o.id,
    o.total_price,
    o.created_at,

    GROUP_CONCAT(d.name) AS destinations,
    GROUP_CONCAT(d.location) AS locations,
    GROUP_CONCAT(d.image) AS images

FROM orders o
LEFT JOIN cart c ON c.user_id = o.user_id
LEFT JOIN destinations d ON d.id = c.destination_id

WHERE o.user_id = ?

GROUP BY o.id
ORDER BY o.created_at DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode([
    "status" => "success",
    "orders" => $orders
]);
?>