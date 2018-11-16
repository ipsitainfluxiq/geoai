<?php
/**
 * Created by PhpStorm.
 * User: INFLUXIQ-01
 * Date: 27-04-2018
 * Time: 18:19
 */
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

$values = array('requestvalue' => json_decode($val),'url' => 'https://geofencedsp.com/assets/php/bidvideo.php');

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://geofencedsp.com:3000/getbidrequest?id=2",
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
  "id": "geoai-8587",
  "seatbid": [
    {
      "seat": "geoaia_932",
      "bid": [
        {
          "impid": "1",
          "price": 2.00987,
          "id": "geoa_ai-552",
          "adm": "<VAST version=\"2.0\">\r\n            <Ad id=\"preroll-1\" modelVersion=\"0.9\">\r\n                <InLine>\r\n                    <AdSystem>2.0</AdSystem>\r\n                    <AdTitle>Geo AI Test</AdTitle>\r\n                    <Creatives>\r\n                        <Creative>   \r\n                            <Linear>\r\n                                <Duration>00:00:10</Duration>\r\n                                <MediaFiles>\r\n                                    <MediaFile height=\"360\" width=\"640\" bitrate=\"2180\" type=\"video/mp4\">https://geofencedsp.com/other_assets/videos/test.mp4</MediaFile>\r\n                                </MediaFiles>\r\n                            </Linear>\r\n                        </Creative>\r\n                        <Creative>\r\n                            <CompanionAds>\r\n                                <Companion height=\"250\" width=\"300\" id=\"568425\">\r\n                                    <HTMLResource>\r\n                                        <![CDATA[\r\n                                            <A href=\"http://geofencedsp.com/\" target=\"_blank\"><IMG SRC=\"http://geofencedsp.com/other_assets/images/320_50_1.jpggeo\" ALT=\"Click Here\" /></A>\r\n                                            <img src=\"http://geofencedsp.com/assets/php/pixel1.php\" height=\"1\" width=\"1\" />]]>\r\n                                    </HTMLResource>\r\n                                    </Companion>\r\n                            </CompanionAds>\r\n                        </Creative>\r\n                    </Creatives>\r\n                </InLine>\r\n            </Ad>\r\n        </VAST>",
          "adomain": [
            "http://geofencedsp.com"
          ],
          "crid": "157798",
          "cid": "3695",
          "iurl": "geofencedsp.com"
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