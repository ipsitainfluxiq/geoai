<?php
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
error_reporting(E_ALL);

$to_email_address = 'debasiskar007@gmail.com';
$subject = 'Pixel3: This is the subject';
$message = "Pixel3: The message is written here!";
$response = mail($to_email_address,$subject,$message);
print_r($response);
?>
