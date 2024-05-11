<?php

include "dbConnection.php";

$connection = new dataBaseConnection();
$connection->dbConnection();
$connection->selectDatabase();
$type = $_POST["type"];
if($type == 'all'){
    $result = $connection->getAllData();

    echo json_encode($result);
}


?>