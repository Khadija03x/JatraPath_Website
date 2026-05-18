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
include "../config/db.php";

/* =========================
   GET INPUT
========================= */
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');

/* =========================
   VALIDATION
========================= */
if (empty($email) || empty($password)) {
    echo json_encode([
        "status" => "error",
        "message" => "Email and password required"
    ]);
    exit();
}

/* =========================
   FIND USER
========================= */
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Database prepare failed",
        "error" => $conn->error
    ]);
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {

    echo json_encode([
        "status" => "user_not_found"
    ]);

    exit();
}

$user = $result->fetch_assoc();

/* =========================
   VERIFY PASSWORD
========================= */
if (!password_verify($password, $user['password'])) {

    echo json_encode([
        "status" => "invalid_password"
    ]);

    exit();
}

/* =========================
   CREATE SESSION
========================= */
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_email'] = $user['email'];

/* =========================
   SUCCESS RESPONSE
========================= */
echo json_encode([
    "status" => "success",
    "user" => [
        "id" => $user['id'],
        "name" => $user['name'],
        "email" => $user['email']
    ]
]);

$stmt->close();
$conn->close();
?>