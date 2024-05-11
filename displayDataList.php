
<!DOCTYPE html>
<html lang="en">

<?php
include "./includes.php";
?>

<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-3">
            <h4> Search by Employee  Code </h4> 
            </div>
            <div class="col-md-3">
             <input type="text" id="search_ID" class="form-control" />
            </div>
     
            <div class="col-md-2">
                <a href="./addData.php" class="btn btn-primary form-control btn-md"> Add new task </a>
            </div>
        </div>
    <div class="row mt-5">
                <div class="col-md-2"></div>
                <div class="col-md-8 ">
                    <table id="bank_table_list">
                        <tr id="table_heading" class="bank_table_list_heading bg-primary">
                            <th>Employee Code</th>
                            <th>Task Name</th>
                            <th>Device Name</th>
                            <th>Description</th>
                            <th>Branch Code</th>
                            <th>Date</th>
                            <th>Actions</th>

                        </tr>
                    </table>
                </div>
                <div class="col-md-2"></div>
            </div>
    </div>

    <div id="updateModal">
        <div id="update_container">
            <div id="close_modal" class="bg-danger">x</div>
            <div id="input_container">

                <form id="update_form">
                    <div class="update_container_input_box">
                    <input type="text" name="ID" id="update_id"  readonly hidden/>
                        <label> Employee Code </label><input type="text" class="form-control" name="empcode" id="update_empcode" />
                    </div>
                    <div class="update_container_input_box">
                        <label>Task Name </label><input type="text" class="form-control" name="task_name" id="update_tname" />
                    </div>
                    <div class="update_container_input_box">
                        <label> Device Name </label><input type="text" class="form-control" name="device_name" id="update_dname" />
                    </div>
                    <div class="update_container_input_box">
                        <label>Description </label><textarea class="form-control" type="text" name="description" id="update_description" cols="1" rows="1"></textarea>
                    </div>
                    <div class="update_container_input_box">
                        <label> Branch Code </label><input type="text" class="form-control" name="bcode" id="update_bcode" />
                    </div>

                    <div class="update_container_input_box">
                        <label> Date </label><input type="date" class="form-control" name="date" id="update_date" />
                    </div>


                </form>
                <div>

                    
                   
                </div>
                             
            </div>
            <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                    <button class="btn btn-warning text-white form-control " id="update_Data"> Update </button>
                    </div>
                </div>
        </div>
    </div>
    <div id="show_more">
    <div class="card" style="width: 18rem;">
  <div class="card-body bg-primary rounded ">
    <p class="card-text text-white" id="show_more_text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </div>
    <script src="./displayDataList.js"> </script>
</body>

</html>