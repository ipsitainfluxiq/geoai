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
$postdata1=$postdata;
//echo "<pre>";
//print_r($postdata);
$postdata = $postdata->operating_system_ids;
//print_r($postdata);
$postnew = $postdata;
//$postdata = $postdata->attr_id;



$count=0;
$postarr=[];
$pobject='[';

foreach ($postnew as $val){
   // echo $val->attr_id;
    $count++;
    $postarr[]=$val->attr_id;
    if($count<(count($postnew)))$pobject.='"'.$val->attr_id.'",';
    else $pobject.='"'.$val->attr_id.'"';
}
$pobject.=']';

//echo $pobject;

$postval=
    //'{"metro_codes":["'.($postarr).'"]}';
    '{
    "campaign": {
    "operating_system_ids":'.$pobject.'
    }
    }';


/*

echo '{
            "campaign": {
        "operating_system_ids": ["802", "808"]
            }
          }';*/
//print_r($postdata);

/*$postdata =  json_encode($postdata->attr_id);

$postvalstr= implode('\n',$postdata->operating_system_ids);
$postvalstr= implode('\n',$postvalstr->attr_id);
$postjsonstr = json_encode(array("operating_system_ids"=>stripcslashes($postvalstr)));
echo $postjsonstr;
//exit;*/



$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/".$postdata1->id,
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