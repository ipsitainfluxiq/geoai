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
    //CURLOPT_URL => "https://app.simpli.fi/api/v2/retail_markups/11268?client_id=93658&company_id=93658&platform_id=0",
    CURLOPT_URL => "https://app.simpli.fi/api/v2/retail_markups?campaign_id=593439&client_id=93658&company_id=93658&platform_id=0",

    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
));

$headers = [
    "X-App-Key: 868eccb0-1c91-0135-38af-067f653fa718",
   // "X-User-Key: 0c815450-1f3a-0135-38c2-067f653fa718"
    "X-User-Key: 10695290-52b4-0135-3ac2-067f653fa718"
];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
//print_r($err);
//echo "<pre>";
print_r(($err));
print_r(($response));
//echo "</pre>";