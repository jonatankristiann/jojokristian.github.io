<?php
require 'koneksi.php';
$nama_lengkap = $_POST["nama_lengkap"];
$email = $_POST["email"];
$no_hp = $_POST["no_telepon"];
$password = $_POST["password"];

$query_sql = "INSERT INTO tbl_customer(email, password, nama_lengkap , no_handphone) 
            VALUES ('$email', '$password', '$nama_lengkap', '$no_hp')";

if (mysqli_query($conn, $query_sql)) {
    header("Location: login.html");
} else {
    echo "Pendaftaran Gagal: " .mysqli_error($conn);
}
