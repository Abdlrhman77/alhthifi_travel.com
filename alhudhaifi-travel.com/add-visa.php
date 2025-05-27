<?php

include 'db.php';

$msg = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $passport_no = $conn->real_escape_string($_POST['passport_no']);
    $applicant_name = $conn->real_escape_string($_POST['applicant_name']);
    $visa_type = $conn->real_escape_string($_POST['visa_type']);
    $status = $conn->real_escape_string($_POST['status']);
    $notes = $conn->real_escape_string($_POST['notes']);

    $sql = "INSERT INTO visa_requests (passport_no, applicant_name, visa_type, status, notes)
            VALUES ('$passport_no', '$applicant_name', '$visa_type', '$status', '$notes')";
    if ($conn->query($sql) === TRUE) {
        $msg = "تمت إضافة المعاملة بنجاح.";
    } else {
        $msg = "حدث خطأ أثناء الإضافة: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>إضافة معاملة جديدة</title>
    <style>
        body { font-family: Tahoma, Arial; background: #f7f7f7; }
        .container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px #ccc; }
        label { display: block; margin-top: 15px; }
        input, textarea, select { width: 100%; padding: 8px; margin-top: 5px; }
        button { margin-top: 20px; padding: 10px 20px; background: #349aa1; color: #fff; border: none; border-radius: 4px; }
        .msg { margin-top: 15px; color: green; }
    </style>
</head>
<body>
    <div class="container">
        <h2>إضافة معاملة جديدة</h2>
        <?php if ($msg) echo "<div class='msg'>$msg</div>"; ?>
        <form method="post">
            <label>رقم الجواز</label>
            <input type="text" name="passport_no" required>

            <label>اسم مقدم الطلب</label>
            <input type="text" name="applicant_name" required>

            <label>نوع التأشيرة</label>
            <input type="text" name="visa_type" required>

            <label>الحالة</label>
            <select name="status" required>
                <option value="قيد المعالجة">قيد المعالجة</option>
                <option value="تمت الموافقة">تمت الموافقة</option>
                <option value="مرفوضة">مرفوضة</option>
                <option value="مكتملة">مكتملة</option>
            </select>

            <label>ملاحظات</label>
            <textarea name="notes"></textarea>

            <button type="submit">إضافة</button>
        </form>
    </div>
</body>
</html>