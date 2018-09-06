<?php
/**
 * Created by PhpStorm.
 * User: iftekar
 * Date: 30/5/17
 * Time: 1:33 PM
 */

header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
?><script type="text/javascript" src="file.js"></script><?php
 /*<script>
var params={click_url:"no_macro",cachebuster: +new Date,deviceid:""};
var s=document.createElement("script");s.type="text/javascript";
s.src="https://cdn.airtory.com/6dcb3dac9aab4a7ef6587b8c5135c891.js";
document.body.appendChild(s);var img=document.createElement("img");
img.src="https://studio.airtory.com/serve/track/6dcb3dac9aab4a7ef6587b8c5135c891/impression"+ params.deviceid+"?n="+params.cachebuster;img.setAttribute("style","position:absolute;visibility:hidden;");
    document.body.appendChild(img);
    </script>*/
$click_url='no_macro';
$cachebuster= getdate();
$deviceid='';
$img ="https://studio.airtory.com/serve/track/6dcb3dac9aab4a7ef6587b8c5135c891/impression";

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://studio.airtory.com/studio/export/6dcb3dac9aab4a7ef6587b8c5135c891',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
));

$headers = [
    $click_url,$cachebuster,$deviceid,$img
];
/*$headers = [
    "SubscriberUsername: GeoAISub",
    "SubscriberPassword: reference",
    "SubscriberID: 58",
   // "AccountID: 10695290-52b4-0135-3ac2-067f653fa718",
    "AccountUsername: geoai",
    "AccountPassword: reference",
  //  "AccountIP: 10695290-52b4-0135-3ac2-067f653fa718",
];*/


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
print_r($err);
//echo "<pre>";
print_r(($response));
//echo "</pre>";