<?php
require 'koneksi.php';
$email = $_POST["email"];
$password = $_POST["password"];

$query_sql = "SELECT * FROM tbl_customer 
            WHERE email = '$email' AND password = '$password'";

$result = mysqli_query($conn, $query_sql);

if (mysqli_num_rows($result) > 0) {
    
    header("Location: index.html");
    echo "Login Berhasil";

} else { 
    echo "Email dan Password Anda Salah";
}
