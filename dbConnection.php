
<?php

use dataBaseConnection as GlobalDataBaseConnection;

class dataBaseConnection
{
    private $servername = 'localhost';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function dbConnection()
    {
        $this->conn = new mysqli($this->servername, $this->username, $this->password);
        if ($this->conn->connect_error) {

            die("Connection failed :" . $this->conn->connect_error);
        }
    }

    public function selectDatabase()
    {
        mysqli_select_db($this->conn, 'bank');
    }

    public function saveNewDetail($empCode , $date , $task_name , $device_name , $description , $branch_code)
    {
        // $this->selectDatabase();
        $newdetail = "INSERT INTO bankdetail(empcode , taskname , devicename , description , branchcode , workdate) 
            VALUES ('$empCode','$task_name' , '$device_name' , '$description' , '$branch_code' , '$date')";

        if ($this->conn->query($newdetail)) {
            $res = array("msg"=>"success");
            return $res;
        }else{
            $res = array("msg"=>"failed" , "error" => $this->conn->error);
            return $res;
        }
    }

    public function getDistinctDetail($id){
        $sql = "SELECT * FROM bankdetail WHERE userID = $id";
        $result = $this->conn->query($sql);
        $data = [];
        if($result){
            while($row = $result->fetch_assoc()){
                $data[] = $row;
            }
          return $data;
        }else{
           return array("error" => "Cannot Find such data"); 
        }
    }
    public function getAllData(){
        $sql = "SELECT * FROM bankdetail";
        $result = $this->conn->query($sql);
        $data = [];
        if($result){
            while($row = $result->fetch_assoc()){
                $data[] = $row;
            }
          return $data;
        }
    }

    public function deleteOne($id){
        $sql = "DELETE FROM bankdetail WHERE ID = $id";
        $result = $this->conn->query($sql);
        if($result){
            echo "Data deleted successfully";
        }else{
            echo "Error: " .  $this->conn->error; 
        }
    }

    public function updateData($id , $empcode  , $task_name , $device_name , $description , $branch_code , $date){
        $check_userID = "SELECT ID FROM bankdetail WHERE ID = '$id'";
        $hasId = $this->conn->query($check_userID);
        if($hasId->num_rows == 1){
            $updateQuery = "UPDATE bankdetail       
       SET empcode = '$empcode', taskname= '$task_name' , devicename = '$device_name' , description = '$description' , branchcode = '$branch_code' , workdate = '$date'
        WHERE ID = '$id' ";
        $result = $this->conn->query($updateQuery);
        if($result){
            echo "true";
        }else{
            echo "false";
        }
    }
    else{
            echo "false";
        }
}
}

?>