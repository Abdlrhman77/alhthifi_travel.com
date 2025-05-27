<?php
// filepath: c:\xampp\htdocs\alhudhaifi-travel.com\alhudhaifi-travel.com\searchvsia.php
include 'db.php';

$passport_no = isset($_GET['passportno']) ? $conn->real_escape_string($_GET['passportno']) : '';

if ($passport_no == '') {
    echo "يرجى إدخال رقم الجواز.";
    exit;
}

$sql = "SELECT * FROM visa_requests WHERE passport_no = '$passport_no' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo "<h3>نتيجة الاستعلام:</h3>";
    echo "<ul>";
    echo "<li>رقم الجواز: " . htmlspecialchars($row['passport_no']) . "</li>";
    echo "<li>اسم مقدم الطلب: " . htmlspecialchars($row['applicant_name']) . "</li>";
    echo "<li>نوع التأشيرة: " . htmlspecialchars($row['visa_type']) . "</li>";
    echo "<li>الحالة: " . htmlspecialchars($row['status']) . "</li>";
    echo "<li>تاريخ التقديم: " . htmlspecialchars($row['submitted_at']) . "</li>";
    echo "<li>ملاحظات: " . htmlspecialchars($row['notes']) . "</li>";
    echo "</ul>";
} else {
    echo "لم يتم العثور على معاملة بهذا الرقم.";
}

$conn->close();
?>