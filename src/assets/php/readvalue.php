<?php
header('Content-Type: text/json');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
error_reporting(E_ALL);
$i=$_GET['path'];
$filepath='http://geoai.influxiq.com/assets/uploads/'.$i;

/*$postdata = file_get_contents("php://input");
$postarrfirstval=json_decode($postdata);
echo 'higggg';
print_r($postarrfirstval);
print_r($postarrfirstval->filenameis);
exit;*/



/*if (($handle = fopen("test.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        echo "<p> $num fields in line $row: <br /></p>\n";
        $row++;
        for ($c=0; $c < $num; $c++) {
            echo $data[$c] . "<br />\n";
        }
    }
    fclose($handle);
}*/
$k=0;
$l=0;
$a=0;
$b=0;
$j=0;
$e=0;
$arr=[];
$z=0;
$postdata=[];
 if (($handle = fopen($filepath, "r")) !== FALSE) {
//if (($handle = fopen('http://simplyfi.influxiq.com/zip_codes_states_upto_4001.csv', "r")) !== FALSE) {
//if (($handle = fopen('http://simplyfi.influxiq.com/testwrong.csv', "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);

        for ($c=0; $c < $num; $c++) {
            if($data[$c]=='latitude'){
               // print_r($c);
                $k=$c;
            }
            if($data[$c]=='longitude'){
                $l=$c;
            }
            if($data[$c]=='city'){
                $a=$c;
            }
            if($data[$c]=='state'){
                $b=$c;
            }
            if($data[$c]=='country'){
                $j=$c;
            }
            if($data[$c]=='zip_code'){
                $e=$c;
            }
        }
        $object = new stdClass();

        if ((preg_match("/^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?);[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\d+))|180(\.0+)?)$/", $data[$k]))
            && (preg_match("/^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?);[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\d+))|180(\.0+)?)$/", $data[$l]))) {
            $object->lat =$data[$k];
            $object->lng =$data[$l];
            $object->address =$data[$a].','.$data[$b].','.$data[$j].','.$data[$e];
            array_push($arr,$object);
            $z++;
        }
        else {
           // echo 'false<br>';
        }
    }
    fclose($handle);
    if($z<1){
        $postdata['msg']='Error: Wrong csv format uploaded!';
        $postdata['flag']=2;
        print_r(json_encode($postdata));
        return;
    }
    if($z<4000){
        $postdata['msg']=$arr;
        $postdata['flag']=1;
        print_r(json_encode($postdata));
    }
    else{
      /*  $postdata=[
            $msg='Error: Cannot upload more than 4000 data',
            $flag=0
        ];*/
        $postdata['msg']='Error: Cannot upload more than 4000 data';
        $postdata['flag']=0;
        print_r(json_encode($postdata));
    }
}
