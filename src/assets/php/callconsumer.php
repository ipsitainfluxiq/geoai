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

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://www.datairis.co/V1/criteria/search/deleteall/consumer");


$postdata = file_get_contents("php://input");
$postarrfirstval=json_decode($postdata);
//print_r($postarrfirstval);
$Physical_State=$postarrfirstval->Physical_State;
$Ind_Ethnic_Code=$postarrfirstval->Ind_Ethnic_Code;
$Income_Code=$postarrfirstval->Income_Code;
$Home_Equity_Available_Code=$postarrfirstval->Home_Equity_Available_Code;


$headers = array();
$headers[] = "TokenID: " . $_GET['token'] . "";
$headers[] = "Content-Type: application/json";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error :' . curl_error($ch);
}
//print_r($result) ;
curl_setopt($ch, CURLOPT_URL, "http://www.datairis.co/V1/criteria/search/addall/consumer");

/*$data = array('Physical_State'=>$physical_state,'Ind_Ethnic_Code'=>$ind_ethnic_code,
    'Income_Code'=>$income_code,'Home_Equity_Available_Code'=>$home_value);*/
foreach ($postarrfirstval as $k=>$val){
    if($val !=''){
        $data[$k]=$val;
    }
}

/*$data = array('Physical_State'=>$physical_state,
    'Income_Code'=>$income_code,'Home_Equity_Available_Code'=>$home_value);*/
$data_json = json_encode($data);
//print_r($data_json);
$headers = array();
$headers[] = "TokenID: " . $_GET['token'] . "";
$headers[] = "Content-Type: application/json";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS,$data_json);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error :' . curl_error($ch);
}
//print_r($result) ;
/*totalsearch*/
curl_setopt($ch, CURLOPT_URL, "http://www.datairis.co/V1/search/count/consumer");

$headers = array();
$headers[] = "TokenID: " . $_GET['token'] . "";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error :' . curl_error($ch);
}
curl_close ($ch);

//print_r($result) ;


$result=json_decode($result);
/*print_r($result);*/
//print_r($result->Response);
if($result->Response->responseCode=='200'){
//echo 'success';
$data['type']='valid';
$data['count']=$result->Response->responseDetails;
}
else{
   // echo 'error';
    $data['type']='invalid';
}
$data=json_encode($data);
print_r($data);