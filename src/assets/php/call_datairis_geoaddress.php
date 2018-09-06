<?php
/**
 * Created by PhpStorm.
 * User: iftekar
 * Date: 30/5/17
 * Time: 1:33 PM
 */

header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');


$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://www.datairis.co/V1/lookup/geo/address/?PartialAddress=%2047-05%20Metropolitan%20Ave%2C%20Ridgewood%2C%20NY%2011385%2C%20USA&Zipcode=11385&ServiceProvider=google",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
));

$headers = array();
$headers[] = "TokenID: 18da8e7b03ad304a690b252086ad764a3f1e";


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
print_r($err);
//echo "<pre>";
print_r(($response));
//echo "</pre>";