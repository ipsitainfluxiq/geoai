<?php
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
error_reporting(E_ALL);

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/geo_targets",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_POSTFIELDS => '',

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
/*echo "<pre>";
 print_r(json_decode($response));
echo "</pre>";
 exit;*/
print_r(($response));
exit;


$getdata=json_decode($response);
$getval=array($getdata);
$curlcounter=0;
$parentarr=[];
foreach ($getval as $index=>$value) {

    foreach ($value->geo_targets as &$value1) {
        /* echo "<pre>";
        print_r(($value1->id));
        echo "</pre>";*/
        $curl = curl_init();
        curl_setopt_array($curl, array(
           // CURLOPT_URL => "https://app.simpli.fi/api/geo_targets?parent_id=".$value1->id,
            CURLOPT_URL => "http://simplyfi.influxiq.com/getchildlist.php?parent_id=".$value1->id,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 100,
            CURLOPT_TIMEOUT => 300,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_POSTFIELDS => '',
        ));

        $headers = [
            "X-App-Key: 868eccb0-1c91-0135-38af-067f653fa718",
            "X-User-Key: 0c815450-1f3a-0135-38c2-067f653fa718",
            "content-type: application/json"
        ];

        $response = curl_exec($curl);
        $err = curl_error($curl);
        //print_r(($response));
        $parentarr[$value->id][]=json_decode($response);
        curl_close($curl);
        /*  echo " hi ";
          $getdata1=json_decode($response);
          $getval=array($getdata1);
          echo "<pre>";
          print_r($getval);
          echo "</pre>";*/
    }
}

$varr['arr']=$getval;
$varr['parentarr']=$parentarr;
echo "<pre>";
print_r($varr);
echo "</pre>";