<?php
/**
 * Created by PhpStorm.
 * User: iftekar
 * Date: 30/5/17
 * Time: 1:52 PM
 */



header('Content-Type: text/json');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
error_reporting(E_ALL);
$campaigndata=($_REQUEST);
$postdata = file_get_contents("php://input");
$postdata=json_decode($postdata);
//echo "<pre>";
//print_r($postdata);
//print_r($postdata->campaigndetails);
//print_r(($postdata->campaigndetails));
//print_r($_REQUEST['campaigndetails']);
//echo "</pre>";
//exit;
$postval=array('campaign'=>$postdata->campaigndetails);
//print_r(json_encode($postval));
//exit;

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/".$postdata->id."/",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "PUT",
    CURLOPT_POSTFIELDS => json_encode($postval),
));

$headers = [
    "X-App-Key: 868eccb0-1c91-0135-38af-067f653fa718",
   // "X-User-Key: 0c815450-1f3a-0135-38c2-067f653fa718",
    "X-User-Key: 10695290-52b4-0135-3ac2-067f653fa718",
    "content-type: application/json"
];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
//print_r($err);
//echo (($response));

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://simplyfi.influxiq.com/get_campaign.php?id=".$postdata->id."/",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_POSTFIELDS => json_encode($postval),
));

$headers = [
    "X-App-Key: 868eccb0-1c91-0135-38af-067f653fa718",
    "X-User-Key: 0c815450-1f3a-0135-38c2-067f653fa718",
    "content-type: application/json"
];


//curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
echo (($response));


/*echo "<pre>";
print_r(json_decode($postval));
echo "</pre>";
echo "<pre>";
print_r(json_encode(@$_REQUEST['jsondata']));
echo "</pre>";
echo @$_REQUEST['jsondata'];*/
