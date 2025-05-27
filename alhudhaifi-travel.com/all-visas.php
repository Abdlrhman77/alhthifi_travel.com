<?php
// filepath: c:\xampp\htdocs\alhudhaifi-travel.com\alhudhaifi-travel.com\all-visa.php
include 'db.php';

$result = $conn->query("SELECT * FROM visa_requests ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>كل المعاملات</title>
    <style>
        body { font-family: Tahoma, Arial; background: #f7f7f7; }
        table { width: 98%; margin: 30px auto; border-collapse: collapse; background: #fff; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
        th { background: #349aa1; color: #fff; }
        tr:nth-child(even) { background: #f2f2f2; }
        a { color: #349aa1; text-decoration: none; }
        .add-btn { display: block; width: 200px; margin: 20px auto; background: #349aa1; color: #fff; padding: 10px; border-radius: 5px; text-align: center; }
    </style>
</head>
<body>
    <a class="add-btn" href="add-visa.php">إضافة معاملة جديدة</a>
    <table>
        <tr>
            <th>رقم</th>
            <th>رقم الجواز</th>
            <th>اسم مقدم الطلب</th>
            <th>نوع التأشيرة</th>
            <th>الحالة</th>
            <th>تاريخ التقديم</th>
            <th>ملاحظات</th>
            <th>تعديل</th>
        </tr>
        <?php while($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= htmlspecialchars($row['passport_no']) ?></td>
            <td><?= htmlspecialchars($row['applicant_name']) ?></td>
            <td><?= htmlspecialchars($row['visa_type']) ?></td>
            <td><?= htmlspecialchars($row['status']) ?></td>
            <td><?= htmlspecialchars($row['submitted_at']) ?></td>
            <td><?= htmlspecialchars($row['notes']) ?></td>
            <td><a href="edit-visa.php?id=<?= $row['id'] ?>">تعديل</a></td>
        </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>