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

$data = json_decode(file_get_contents("php://input"));

if($_SERVER["HTTP_REFERER"] == 'http://localhost:4200/'){
    $hiturl='http://localhost:3000/';
}else{
    $hiturl='http://geofencedsp.com:3000/';
}

function callpostagain($data1,$hiturl){
    $data_string = json_encode($data1);
    $d=http_build_query($data1);
    // $ch = curl_init("http://geofencedsp.com:3000/" . $_GET['q'].'?'.$d);
    $ch = curl_init($hiturl . $_GET['q'].'?'.$d);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response= curl_exec($ch);
    echo (($response));
    curl_close($ch);
}

function callgetagain($hiturl){
    $curl = curl_init();
    curl_setopt_array($curl, array(
        //    CURLOPT_URL => "http://geofencedsp.com:3000/" . $_GET['q'],
        CURLOPT_URL => $hiturl . $_GET['q'],
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
    echo $response;
}

if($_GET['q']== 'uploads') {
    $path = 'assets/uploads/';
    if (isset($_FILES['file'])) {
        $originalName = $_FILES['file']['name'];
        $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
        $generatedName = md5($_FILES['file']['tmp_name']).$ext;
        $filePath = $path.$generatedName;

        if (!is_writable($path)) {
            echo json_encode(array(
                'status' => false,
                'msg'    => 'Destination directory not writable.'
            ));
            exit;
        }
        if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
            echo json_encode(array(
                'status'        => true,
                'originalName'  => $originalName,
                'generatedName' => $generatedName
            ));
        }
    }
    else {
        echo json_encode(
            array('status' => false, 'msg' => 'No file uploaded.')
        );
        exit;
    }
}
else{
    if(count($data)==0) {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            //   CURLOPT_URL => "http://geofencedsp.com:3000/" . $_GET['q'],
            CURLOPT_URL => $hiturl . $_GET['q'],
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
        if(strlen($response)>7) echo $response;
        else callgetagain($hiturl);

    }
    else{
        $data_string = json_encode($data);
        $d=http_build_query($data);
        // $ch = curl_init("http://geofencedsp.com:3000/" . $_GET['q'].'?'.$d);
        $ch = curl_init($hiturl . $_GET['q'].'?'.$d);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response= curl_exec($ch);
        if(strlen($response)>2)
            echo (($response));
        else callpostagain($data,$hiturl);
        curl_close($ch);
    }
}
