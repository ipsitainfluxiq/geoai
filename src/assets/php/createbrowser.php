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
$postarrfirstval=json_decode($postdata );
//print_r($postarrfirstval);

$id=json_decode($postarrfirstval->id);
$postarrfirstval = json_decode($postarrfirstval -> selected_browsers);
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
/*print_r($postarr);
print_r($pobject);*/
// exit;
$postval=
    '{"campaign":{"browser_ids":'.$pobject.'}}';
//print_r($postval);

$curl = curl_init();
curl_setopt_array($curl, array(
    // CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/627265/",
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/".$id."/",
    //  CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/626350/ip_ranges",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "PUT",
    CURLOPT_POSTFIELDS => $postval,
    /*    CURLOPT_POSTFIELDS =>'{
            "campaign": {
        "integral_viewability_threshold_id": 3
            }
          }'*/
    /*CURLOPT_POSTFIELDS =>'{
            "campaign": {
        "pacing": 40.0
            }
          }'*/
    /*CURLOPT_POSTFIELDS =>'{
            "campaign": {
        "operating_system_ids": ["802", "808"]
            }
          }'*/
    /* CURLOPT_POSTFIELDS =>'{
         "campaign": {
   "dayparting":"111110000000000000000000000000000000000000000000000000000011111111111111000000000000001111111111000000000000000000000000111000000000000000000000000000000001111111101111"
         }
       }',*/

    /*    CURLOPT_POSTFIELDS =>'{
        "campaign_ip_range": {"ip_start":"100.168.1.1","ip_end":"101.168.1.9"}
            }',*/
    /*    CURLOPT_POSTFIELDS =>'{
            "campaign": {
        "browser_ids": ["602", "603"]
            }
          }',*/
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