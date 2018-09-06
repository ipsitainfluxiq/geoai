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
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");


$curl = curl_init();
curl_setopt_array($curl, array(
 //   CURLOPT_URL => "http://influxiq.com:3014/getcreativedetailsbyid?id=".$_GET['id'],
    CURLOPT_URL => "http://geofencedsp.com:3000/getcreativedetailsbyid?id=".$_GET['id'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
));

$headers = [];


curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
//print_r($err);
//print_r(($response));
$responseval=json_decode($response);
//print_r($responseval);
$responsecode=$responseval[0]->code;
//print_r($response[0]);
//echo $responsecode;
?>

<html>
<head></head>
<body>
<?php
echo $responsecode;
?>

</body>
</html>
