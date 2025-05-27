<?php
// filepath: c:\xampp\htdocs\alhudhaifi-travel.com\alhudhaifi-travel.com\db.php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "alhudhaifi_travel";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}
?>