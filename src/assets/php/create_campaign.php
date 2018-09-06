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
/*$postval='{
        "geo_fencing_recency_id": 9
      }';

$arr1=
$postval=Array('geo_fences'=>array('name='));*/

$postval=
    '{
       "geo_fences": [
          {
              "name": "Somewhere Special",
            "bid_area": {
              "type": "Polygon",
              "coordinates": [
                  '.(@$_REQUEST["jsondata"]).'
              ]
            }
          }
        ]
      }';

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_POSTFIELDS => '{"name":"campaign debasis"}',
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
//echo "<pre>";
print_r(($response));
//echo "</pre>";

/*echo "<pre>";
print_r(json_decode($postval));
echo "</pre>";
echo "<pre>";
print_r(json_encode(@$_REQUEST['jsondata']));
echo "</pre>";
echo @$_REQUEST['jsondata'];*/