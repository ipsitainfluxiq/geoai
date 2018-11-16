<?php

header('Content-Type: text/json');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
error_reporting(E_ALL);

//echo "pre for file get ";
//echo '<pre>'.print_r(json_decode(file_get_contents("php://input")),1).'</pre>';
$val = file_get_contents("php://input");

$values = array('requestvalue' => json_decode($val),'url' => 'https://geofencedsp.com/assets/php/bidnative.php');

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://geofencedsp.com:3000/getbidrequest?id=3",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    // CURLOPT_POSTFIELDS =>$val,
    CURLOPT_POSTFIELDS =>json_encode($values),
));
$headers = [];
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
//print_r($response);
//exit;
if($val!=null){
$ortb='{
    "id": "PrdCxMJ041",
    "bidid": "7s95335i",
    "seatbid": [
        {
            "seat": "geoai_12",
            "bid": [
                {
                    "impid": "1",
                    "price": 0.4,
                    "id": "7s95335i",
                    "adm": "{\"native\":{\"link\":{\"url\":\"http://geofencedsp.com/assets/php/pixel1.php\"},\"assets\":[{\"id\":1,\"required\":1,\"title\":{\"text\":\"Title\"}},{\"id\":3,\"required\":1,\"img\":{\"url\":\"http://geofencedsp.com/other_assets/images/320_50_1.jpg\"}},{\"id\":2,\"required\":1,\"img\":{\"url\":\"http://geofencedsp.com/other_assets/images/320_50_1.jpg\"}},{\"id\":4,\"required\":1,\"data\":{\"value\":\"Description\"}},{\"id\":5,\"required\":1,\"data\":{\"value\":\"CTA Text.\"}}]}}",
                    "adomain": [
                        "https://geofencedsp.com/"
                    ],
                    "crid": "16969426",
                    "cid": "2445",
                    "iurl": "http://geofencedsp.com/other_assets/images/320_50_1.jpg",
                    "nurl": "http://geofencedsp.com/assets/php/pixel1.php"
                }
            ]
        }
    ]
}';
echo $ortb;
}
else{
    $ortb='{
    ob_start();
    header("HTTP/1.1 204 NO CONTENT");
    header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
    header("Pragma: no-cache"); // HTTP 1.0.
    header("Expires: 0"); // Proxies.
    ob_end_flush(); //now the headers are sent
    }';
    echo $ortb;
}