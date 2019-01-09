<?php

set_time_limit(0);
header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

$data = array('error_code'=>1,'msg'=>'File Upload Error Occured! Try Again.');
if(isset($_FILES['file'])){
    if($_FILES['file']['error'] == 0){
        $filename = $_FILES['file']['name'];
        $basename = pathinfo($filename , PATHINFO_FILENAME);
        $ext = pathinfo($filename ,  PATHINFO_EXTENSION);
        $basename = str_replace(' ','',$basename);
        $basename = strtolower($basename);
        $basename = $basename.'-'.time();
        $newfilename = $basename.'.'.$ext;
        $fileserver = 'uploads/'.$newfilename;
        if(move_uploaded_file($_FILES['file']['tmp_name'],$fileserver)){
            $data = array('error_code'=>0,'filename'=>$newfilename);
        }
    }else{
        $data = array('error_code'=>1,'msg'=>$_FILES['file']['error']);
    }
}

echo json_encode($data);

?>