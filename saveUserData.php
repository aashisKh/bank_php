

<?php

include "dbConnection.php";

$connection = new dataBaseConnection();
$connection->dbConnection();
$connection->selectDatabase();


$data = $_POST['userData'];
$json_data = ( json_decode($data , true));

$empCode = $json_data[0]['empcode'];
$date = $json_data[0]['date'];
$response;
for($i = 0; $i < count($json_data[0]['allTasks']) ; $i++){
    $task_name =  trim($json_data[0]['allTasks'][$i]['taskname']);
    $device_name =  trim($json_data[0]['allTasks'][$i]['devicename']);
    $description =  trim($json_data[0]['allTasks'][$i]['description']);
    $branch_code =  trim($json_data[0]['allTasks'][$i]['branchcode']);
   $response =  $connection->saveNewDetail($empCode , $date , $task_name , $device_name , $description , $branch_code);
   

}
echo(json_encode($response));

?>