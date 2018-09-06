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
/*$postdata = file_get_contents("php://input");
$postdata=json_decode($postdata);
$postdata1=$postdata;
$postdata = $postdata->operating_system_ids;
$postnew = $postdata;

$count=0;
$postarr=[];
$pobject='[';

foreach ($postnew as $val){
    $count++;
    $postarr[]=$val->attr_id;
    if($count<(count($postnew)))$pobject.='"'.$val->attr_id.'",';
    else $pobject.='"'.$val->attr_id.'"';
}
$pobject.=']';
$postval=
    '{
    "campaign": {
    "operating_system_ids":'.$pobject.'
    }
    }';*/

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://app.simpli.fi/api/companies/93658/clients/93658/campaigns/631800/ads",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 100,
    CURLOPT_TIMEOUT => 300,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    /* CURLOPT_POSTFIELDS =>'{
     "deals": "DEAL4r\nDEAL5r\nDEAL6"
   }',*/

    CURLOPT_POSTFIELDS => '{
    "ad":{"name":"working.jpg","alt_text":"Alternate text 125 characters or less","target_url":"http://simpli.fi","pacing":100,"ad_file_type_id":1,"ad_size_id":11,"primary_creative":"@a728x90.jpg;type=image/jpeg"}
    }',

/*    CURLOPT_POSTFIELDS => '{"ad":{"id":4897678,"name":"download.jpg","ad_size_id":11,"ad_position_id":0,"ad_file_type_id":1,"target_url":null,"click_tag_verified":null,"active":true,"pacing":100.0,"extra_html":null,"html":null,"impression_tracking":[],"click_tracking":[],"title":null,"body":null,"call_to_action":null,"ad_wmode_id":1,"phone_number":null,"alt_text":null,"skippable":false,"third_party_vast_tag":null,"dynamic_ad_feed_id":null,"ad_template_id":null,"dynamic_ad_type_id":null,"ad_branding_id":null,"dynamic_ad_load_strategy_id":null,"dynamic_ad_initial_items":null}}',*/
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
print_r(($response));