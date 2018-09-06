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
/*echo "<pre>";
print_r($postdata);
echo "</pre>";
exit;*/
$postarrfirstval=json_decode($postdata);
$id=json_decode($postarrfirstval->id);
$postarr=json_decode($postarrfirstval->fence);
$temparr=[];
$tempval=[];
$count=0;
//$postarr=json_decode($postdata);


foreach ($postarr as $val){
    $count++;
    $tempval[$count]['name']=$val->fencename;
/*    $tempval[$count]['type']=2;*/
    $tempval[$count]['geo_fence_type_name']='Conversion';
    $tempval[$count]['bid_area']['type']="Polygon";
    $tempval[$count]['bid_area']['coordinates'][]=$val->fencecoordinates;
    $temparr[]=$tempval[$count];
}


 $postval=
    '{"geo_fences":'.json_encode($temparr).'}';
//print_r($postval);
//exit;

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/".$id."/geo_fences",
    //CURLOPT_URL => "https://app.simpli.fi/api/v2/campaigns/602417?client_id=93658&company_id=93658&platform_id=0",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "PUT",
    CURLOPT_POSTFIELDS => $postval, /* '{
    "geo_fences": [
        {
            "name": "Somewhere Special",
            "bid_area": {
            "type": "Polygon",
                "coordinates": [
                [
                    [-93.744021,38.825266],
                    [-93.744021,38.82881],
                    [-93.737926,38.82881],
                    [-93.737926,38.825266]
                ]
            ]
            },
            "geo_fence_type_name":"Conversion"
        }'*/
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
print_r(($err));
//echo "</pre>";
