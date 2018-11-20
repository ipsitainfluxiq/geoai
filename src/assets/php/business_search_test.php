<?php

                                    /*DELETE BUSINESS SEARCH*/
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://www.datairis.co/V1/criteria/search/deleteall/business");
$headers = array();
$headers[] = "TokenID: 7ba1971802efc047690b7140d60c9892e5d4";
$headers[] = "Content-Type: application/json";
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo 'Error :' . curl_error($ch);
}
curl_close ($ch);
//print_r($result);echo "<br>";


                                    /*ADD BUSINESS SEARCH*/
$ch1 = curl_init();
curl_setopt($ch1, CURLOPT_URL, "http://www.datairis.co/V1/criteria/search/addall/business");
$data1 = array('proximity'=>'123 Main St|68137|1');
$data1 = array('Business_Type_Code'=>'B');
$data1 = array('RDI'=>'B');
$data1 = array('Linkage_Rank'=>'10');
$data1 = array('Location_Employee_Code'=>'A');
$data1 = array('Corporate_Employee_Code'=>'A');
$data1 = array('Business_Status_Code'=>'2');
$data1 = array('Credit_Code'=>'A+');
$data1 = array('Linkage_Type'=>'BN');
$data1 = array('Locations_Sales_Code'=>'A');
$data1 = array('Years_In_Business_Code'=>'1');
$data1 = array('Square_Footage_Code'=>'A');
$data1 = array('Credit_Capacity_Code'=>'A');
$data1 = array('Technology_Expense_Code'=>'A');
$data1 = array('Rent_Expense_Code'=>'A');
$data1 = array('Accounting_Expense_Code'=>'A');
$data1 = array('Legal_Expense_Code'=>'A');
$data1 = array('Number_of_PCs_code'=>'A');
$data1 = array('Advertising_Expense_code'=>'A');
$data1 = array('Office_Equip_Expense_code'=>'A');
$data1 = array('Telecom_Expense_code'=>'A');
$data1 = array('Business_Insurance_Expense_code'=>'A');
$data1 = array('Utilities_Expense_code'=>'A');


$data_json1 = json_encode($data1);
curl_setopt($ch1, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch1, CURLOPT_POSTFIELDS,$data_json1);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch1, CURLOPT_CUSTOMREQUEST, "PUT");
$result1 = curl_exec($ch1);
if (curl_errno($ch1)) {
    echo 'Error :' . curl_error($ch1);
}
curl_close ($ch1);
print_r($result1);echo "<br>";



                                    /*COUNT BUSINESS SEARCH*/

$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, "http://www.datairis.co/V1/search/count/business");
curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_CUSTOMREQUEST, "GET");
$result2 = curl_exec($ch2);
if (curl_errno($ch2)) {
    echo 'Error :' . curl_error($ch2);
}
curl_close ($ch2);
print_r($result2) ;



