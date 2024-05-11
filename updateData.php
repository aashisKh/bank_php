<?php

include "dbConnection.php";

$connection = new dataBaseConnection();
$connection->dbConnection();
$connection->selectDatabase();
$get_update_Data = $_POST["update_list"];


 
$json_data = ( json_decode($get_update_Data , true));

$id = ($json_data["id"]);
$empcode = ($json_data["empcode"]);
$taskname = ($json_data["taskname"]);
$devicename = ($json_data["devicename"]);
$description = ($json_data["description"]);
$branchcode = ($json_data["branchcode"]);
$date = ($json_data["date"]);

echo $id , $empCode ,   $taskname , $devicename , $description , $branchcode , $date;

$response = $connection->updateData($id , $empcode ,   $taskname , $devicename , $description , $branchcode , $date);
print_r($response);
?>