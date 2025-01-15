<?php
require 'koneksiAdmin.php';
$username = $_POST["username"];
$password = $_POST["password"];

$query_sql = "SELECT * FROM tbl_admin 
            WHERE username = '$username' AND password = '$password'";

$result = mysqli_query($conn, $query_sql);

if (mysqli_num_rows($result) > 0) {
    header("Location: menu.html");
} else { 
    echo "Username dan Password Anda Salah";
}
