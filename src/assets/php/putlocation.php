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

$postdata = file_get_contents("php://input");
$postarrfirstval=json_decode($postdata);
$count=0;
$postarr=[];
$pobject='[';

foreach ($postarrfirstval as $val){
    $count++;
    $postarr[]=$val->attr_id;
    if($count<(count($postarrfirstval)))$pobject.='"'.$val->attr_id.'",';
    else $pobject.='"'.$val->attr_id.'"';
}
$pobject.=']';
print_r($postarr);
// exit;

 $postval=
    //'{"metro_codes":["'.($postarr).'"]}';
    '{"metro_codes":'.$pobject.'}';

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/campaigns/616812/geo_targets/add_by_metro_code",
    //CURLOPT_URL => "https://app.simpli.fi/api/campaigns/616812/geo_targets",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    // CURLOPT_POSTFIELDS => '{"metro_codes": ["558"]}',
    //  CURLOPT_POSTFIELDS => '{"metro_codes": ["534", "540", "558"]}',
    //CURLOPT_POSTFIELDS => '{"metro_codes":["307514","253506"]}',
    CURLOPT_POSTFIELDS => $postval,
    /*CURLOPT_POSTFIELDS => '{
  "geo_targets": [
    {
        "resource": "https://app.simpli.fi/api/geo_targets/307514",
      "id": 307514,
      "name": "Algeria",
      "parent_id": null,
      "active": true,
      "resources": [
        {
            "geo_targets": "https://app.simpli.fi/api/geo_targets?parent_id=307514"
        }
      ],
      "updated_date": "2017-07-06"
    }',*/
));

$headers = [
    "X-App-Key: 868eccb0-1c91-0135-38af-067f653fa718",
    "X-User-Key: 10695290-52b4-0135-3ac2-067f653fa718",
    "content-type: application/json"
];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
print_r($err);
print_r($response);
