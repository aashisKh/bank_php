<?php

include "dbConnection.php";

$connection = new dataBaseConnection();
$connection->dbConnection();
$connection->selectDatabase();
$id = $_POST["id"];
$connection->deleteOne($id);
echo $id;
?>