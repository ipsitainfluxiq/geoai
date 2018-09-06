<?php
/**
 * Created by PhpStorm.
 * User: iftekar
 * Date: 30/5/17
 * Time: 1:52 PM
 */



header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
error_reporting(E_ALL);
$postdata = file_get_contents("php://input");
$postdata=json_decode($postdata);
//echo "<pre>";
print_r($postdata);
//exit;

$postvalstr= implode('\n',$postdata->deals);
$postjsonstr = json_encode(array("deals"=>stripcslashes($postvalstr)));
echo $postjsonstr;


$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/".$postdata->id."/deals?all=true",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "DELETE",
    /*CURLOPT_POSTFIELDS =>'{
        "deals": "DEAL4r\nDEAL5r\nDEAL6"
      }',*/

    //CURLOPT_POSTFIELDS => $postjsonstr,
));

$headers = [
    "X-App-Key: 868eccb0-1c91-0135-38af-067f653fa718",
    //  "X-User-Key: 0c815450-1f3a-0135-38c2-067f653fa718",
    "X-User-Key: 10695290-52b4-0135-3ac2-067f653fa718",
    "content-type: application/json"
];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/".$postdata->id."/deals",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "PUT",
   /* CURLOPT_POSTFIELDS =>'{
        "deals": "DEAL4r\nDEAL5r\nDEAL6"
      }',*/

    CURLOPT_POSTFIELDS => $postjsonstr,
));

$headers = [
    "X-App-Key: 868eccb0-1c91-0135-38af-067f653fa718",
    //  "X-User-Key: 0c815450-1f3a-0135-38c2-067f653fa718",
    "X-User-Key: 10695290-52b4-0135-3ac2-067f653fa718",
    "content-type: application/json"
];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
print_r($err);
/*echo "<pre>";*/
print_r(($response));
/*echo "</pre>";*/