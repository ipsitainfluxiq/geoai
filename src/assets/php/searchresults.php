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

$result=null;
$data=null;
// Generated by curl-to-PHP: http://incarnate.github.io/curl-to-php/
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://www.datairis.co/V1/search/consumer?Start=1&End=500");


/*$data = array('Physical_State'=>'ca');
$data_json = json_encode($data);*/

$headers = array();
// $headers[] = "TokenID: 7c151f710d05e04dc1098bc0558b7f50d74a";
$headers[] = "TokenID: " . $_GET['token'] . "";
//$headers[] = "Content-Type: application/json";
/*$headers[] = "Subscriberusername: GeoAISub";
$headers[] = "Subscriberpassword: reference";
$headers[] = "Accountusername: geoai";
$headers[] = "Accountpassword: reference";
$headers[] = "Accountdetailsrequired: true";*/
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
//curl_setopt($ch, CURLOPT_POSTFIELDS,$data_json);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error :' . curl_error($ch);
}
curl_close ($ch);
$result=json_decode($result);
/*echo "<pre>";
print_r($result) ;
echo "</pre>";*/
$result= $result->Response->responseDetails->SearchResult->searchResultRecord;
/*echo "<pre>";
print_r($result) ;
echo "</pre>";*/
/*$result=json_encode($result);
print_r($result);*/
$i=0;

foreach( $result as $k=>$val){
    foreach( $val as $k1=>$val1) {

foreach( $val1 as $k2=>$val2) {
    /* echo $val1;
    echo $k1;
    echo $k2;*/
    $data[$i][$val2->fieldID] = $val2->fieldValue;
    /* echo "<pre>";
    echo '========';
    print_r($k2);
    print_r($val2);
    echo "</pre>";*/
}
        $i++;
    }
}

/*echo "<pre>";
echo '<br/>';
print_r($data);
//print_r($val2);
echo "</pre>";*/
//echo count($data);exit;
echo json_encode($data);
