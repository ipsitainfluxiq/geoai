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

//$values = array('requestvalue' => json_decode($val),'url' => 'https://geofencedsp.com/assets/php/bidimage.php');

$curl = curl_init();
curl_setopt_array($curl, array(
     CURLOPT_URL => "http://geofencedsp.com:3000/getbidrequest?id=1",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS =>$val,
   // CURLOPT_POSTFIELDS =>json_encode($values),
));
$headers = [];
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
//print_r($response);
//exit;


if($val!=null){
    $ortb='{
  "seatbid": [
    {
      "bid": [
        {
          "nurl": "http://geofencedsp.com/assets/php/pixel3.php?wp=${AUCTION_PRICE}",
          "crid": "98459",
          "adomain": [
            "geofencedsp.com"
          ],
          "price": 0.33,
          "iurl":"https://geofencedsp.com/bidiurl.php?q=fsfde436546rtgfhWE34324",
          "id": "1DGXhoQYtm",
          "adm": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<ad xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"smaato_ad_v0.9.xsd\" modelVersion=\"0.9\">\r\n   <imageAd>\r\n      <clickUrl>http://geofencedsp.com/assets/php/pixel3.php</clickUrl>\r\n      <imgUrl>http://geofencedsp.com/other_assets/images/320_50_1.jpg</imgUrl>\r\n      <height>50</height>\r\n      <width>320</width>\r\n      <beacons>\r\n         <beacon>http://geofencedsp.com/assets/php/pixel1.php</beacon>\r\n         <beacon>http://geofencedsp.com/assets/php/pixel2.php</beacon>\r\n      </beacons>\r\n   </imageAd>\r\n</ad>",
          "impid": "1",
          "cid": 5163
        }
      ]
    }
  ],
  "id": "1DGXhoQYtm"
}';
    echo $ortb;
}
else{
    {
    ob_start();
    header("HTTP/1.1 204 NO CONTENT");
    header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
    header("Pragma: no-cache"); // HTTP 1.0.
    header("Expires: 0"); // Proxies.
    ob_end_flush(); //now the headers are sent
    };

}