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

$postval=
    '{
   "id":"DxU0032U8a",
   "at":2,
   "allimps":0,
   "imp":[
      {
         "id":"1",
         "banner":{
            "w":320,
            "h":50,
            "format":[
               {
                  "w":320,
                  "h":50
               }
            ],
            "btype":[
               1,
               3
            ],
            "battr":[
               1,
               3,
               5,
               6,
               8,
               9,
               10,
               11
            ],
            "pos":3,
            "mimes":[
               "image/jpeg",
               "image/png",
               "image/gif"
            ],
            "api":[
 
            ]
         },
         "ext":{
            "strictbannersize":0
         },
         "instl":0,
         "displaymanager":"SOMA",
         "tagid":"101000415",
         "secure":0
      }
   ],
   "device":{
      "geo":{
         "lat":53.550003,
         "lon":10,
         "ipservice":3,
         "country":"DEU",
         "region":"04",
         "zip":"20099",
         "metro":"0",
         "city":"Hamburg",
         "type":2
      },
      "make":"Google",
      "model":"Nexus One",
      "os":"Android",
      "osv":"2.1",
      "ua":"Mozilla/5.0 (Linux; U; Android 2.1; en-us; Nexus One Build/ERD62) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17",
      "ip":"95.90.255.47",
      "js":0,
      "connectiontype":0,
      "devicetype":1
   },
   "app":{
      "id":"101000415",
      "name":"OpenRTB_2_4_UATest_openRtb_2_4_iOS_XXLARGE_320x50_IAB1",
      "domain":"example.com",
      "cat":[
         "IAB1"
      ],
      "storeurl":"http://example.com",
      "keywords":"",
      "publisher":{
         "id":"1001028764",
         "name":"OpenRTB_2_4_UATest_openRtb_2_4_iOS_XXLARGE_320x50_IAB1"
      }
   },
   "bcat":[
      "IAB17-18",
      "IAB7-42",
      "IAB23",
      "IAB7-28",
      "IAB26",
      "IAB25",
      "IAB9-9",
      "IAB24"
   ],
   "badv":[
 
   ],
   "ext":{
      "udi":{
 
      },
      "operaminibrowser":0,
      "carriername":"unknown - probably WLAN"
   },
   "regs":{
      "coppa":0,
      "ext":{
         "gdpr":1
      }
   },
   "user":{
      "keywords":"",
      "ext":{
         "consent":"BONZC5sONZC5sAAABAENAAoAAAAFIgAAAAAAAAAAAAI"
      }
   }
}';

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://localhost:3000/rtbresponse.php",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => $postval,
));

$headers = [];

curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
print_r($response);