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

$postarrfirstval=json_decode($postdata);
$id=json_decode($postarrfirstval->id);
                                          /*blank the locations_start*/

$postblankval=
    '{
    "campaign": {
    "geo_target_ids":['.null.']
    }
    }';


$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/".$id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "PUT",
    CURLOPT_POSTFIELDS => $postblankval,
));

$headers = [
    "X-App-Key: 868eccb0-1c91-0135-38af-067f653fa718",
    "X-User-Key: 10695290-52b4-0135-3ac2-067f653fa718",
    "content-type: application/json"
];

curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);


                                       /*blank the locations_end*/






/*$postdata = file_get_contents("php://input");
$postarrfirstval=json_decode($postdata);
$id=json_decode($postarrfirstval->id);*/
$postarr=json_decode($postarrfirstval->fence);

$temparr=[];
$tempval=[];
$count=0;
foreach ($postarr as $val){

    //if($count>0) break;
    $count++;
    $tempval[$count]['name']=$val->fencename;
    $tempval[$count]['bid_area']['type']="Polygon";
    $tempval[$count]['bid_area']['coordinates'][]=$val->fencecoordinates;
    $tempval[$count]['type_name']='Target';
    $temparr[]=$tempval[$count];
}

//print_r(json_encode($temparr));exit;

echo $postval=
   '{"geo_fences":'.json_encode($temparr).'}';

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/".$id."/geo_fences",
    // CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/602417/geo_fences",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "PUT",
    CURLOPT_POSTFIELDS => $postval,
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
//echo "<pre>";
print_r(($response));
//print_r(($err));
//echo "</pre>";

/*echo "<pre>";
print_r(json_decode($postval));
echo "</pre>";
echo "<pre>";
print_r(json_encode(@$_REQUEST['jsondata']));
echo "</pre>";
echo @$_REQUEST['jsondata'];*/



















