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
   INPUTS
========================= */
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$confirm = trim($_POST['confirm_password'] ?? '');

/* =========================
   VALIDATION
========================= */
if (
    empty($name) ||
    empty($email) ||
    empty($password) ||
    empty($confirm)
) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit();
}

/* PASSWORD MATCH */
if ($password !== $confirm) {
    echo json_encode([
        "status" => "password_mismatch"
    ]);
    exit();
}

/* =========================
   CHECK EMAIL EXISTS
========================= */
$check = $conn->prepare(
    "SELECT id FROM users WHERE email = ?"
);

$check->bind_param("s", $email);
$check->execute();

$result = $check->get_result();

if ($result->num_rows > 0) {

    echo json_encode([
        "status" => "email_exists"
    ]);

    exit();
}

/* =========================
   HASH PASSWORD
========================= */
$hashed = password_hash(
    $password,
    PASSWORD_DEFAULT
);

/* =========================
   INSERT USER
========================= */
$sql = "
INSERT INTO users
(name, email, password)
VALUES (?, ?, ?)
";

$stmt = $conn->prepare($sql);

if (!$stmt) {

    echo json_encode([
        "status" => "error",
        "message" => $conn->error
    ]);

    exit();
}

$stmt->bind_param(
    "sss",
    $name,
    $email,
    $hashed
);

/* =========================
   EXECUTE
========================= */
if ($stmt->execute()) {

    $_SESSION['user_id'] = $stmt->insert_id;

    echo json_encode([
        "status" => "success",
        "user" => [
            "id" => $stmt->insert_id,
            "name" => $name,
            "email" => $email
        ]
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>