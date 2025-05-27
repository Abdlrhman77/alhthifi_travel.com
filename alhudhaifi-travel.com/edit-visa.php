<?php
// filepath: c:\xampp\htdocs\alhudhaifi-travel.com\alhudhaifi-travel.com\add-visa.php
include 'db.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$msg = '';

if ($id <= 0) {
    die("رقم المعاملة غير صحيح.");
}

// تحديث البيانات إذا تم الإرسال
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $passport_no = $conn->real_escape_string($_POST['passport_no']);
    $applicant_name = $conn->real_escape_string($_POST['applicant_name']);
    $visa_type = $conn->real_escape_string($_POST['visa_type']);
    $status = $conn->real_escape_string($_POST['status']);
    $notes = $conn->real_escape_string($_POST['notes']);

    $sql = "UPDATE visa_requests SET 
        passport_no='$passport_no',
        applicant_name='$applicant_name',
        visa_type='$visa_type',
        status='$status',
        notes='$notes'
        WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        $msg = "تم تحديث المعاملة بنجاح.";
    } else {
        $msg = "حدث خطأ أثناء التحديث: " . $conn->error;
    }
}

// جلب بيانات المعاملة
$result = $conn->query("SELECT * FROM visa_requests WHERE id=$id LIMIT 1");
if (!$result || $result->num_rows == 0) {
    die("لم يتم العثور على المعاملة.");
}
$row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>تعديل معاملة</title>
    <style>
        body { font-family: Tahoma, Arial; background: #f7f7f7; }
        .container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px #ccc; }
        label { display: block; margin-top: 15px; }
        input, textarea, select { width: 100%; padding: 8px; margin-top: 5px; }
        button { margin-top: 20px; padding: 10px 20px; background: #349aa1; color: #fff; border: none; border-radius: 4px; }
        .msg { margin-top: 15px; color: green; }
        a { color: #349aa1; }
    </style>
</head>
<body>
    <div class="container">
        <h2>تعديل معاملة</h2>
        <?php if ($msg) echo "<div class='msg'>$msg</div>"; ?>
        <form method="post">
            <label>رقم الجواز</label>
            <input type="text" name="passport_no" value="<?= htmlspecialchars($row['passport_no']) ?>" required>

            <label>اسم مقدم الطلب</label>
            <input type="text" name="applicant_name" value="<?= htmlspecialchars($row['applicant_name']) ?>" required>

            <label>نوع التأشيرة</label>
            <input type="text" name="visa_type" value="<?= htmlspecialchars($row['visa_type']) ?>" required>

            <label>الحالة</label>
            <select name="status" required>
                <option value="قيد المعالجة" <?= $row['status']=='قيد المعالجة'?'selected':'' ?>>قيد المعالجة</option>
                <option value="تمت الموافقة" <?= $row['status']=='تمت الموافقة'?'selected':'' ?>>تمت الموافقة</option>
                <option value="مرفوضة" <?= $row['status']=='مرفوضة'?'selected':'' ?>>مرفوضة</option>
                <option value="مكتملة" <?= $row['status']=='مكتملة'?'selected':'' ?>>مكتملة</option>
            </select>

            <label>ملاحظات</label>
            <textarea name="notes"><?= htmlspecialchars($row['notes']) ?></textarea>

            <button type="submit">تحديث</button>
        </form>
        <br>
        <a href="all-visas.php">العودة إلى كل المعاملات</a>
    </div>
</body>
</html>