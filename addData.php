<!DOCTYPE html>
<html lang="en">

<?php
include "./includes.php";
?>

<body>
    <div class="container my-5" id="add_task_container">
        <form id="new_data_form">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-4">
                    <input type="text" id="emp_code" class="form-control" name="empcode" placeholder="Enter Employee Code">

                </div>
                <div class="col-md-4">
                    <input type="date" class="form-control" name="date" placeholder="today date">

                </div>
                <div class="col-md-2"></div>
            </div>
            <div class="row mt-5">
                <div class="col-md-2"></div>
                <div class="col-md-8 ">
                    <table id="bank_table">
                        <tr id="table_heading" class="new_row_table_heading bg-primary">
                            <th>Task Name</th>
                            <th>Device Name</th>
                            <th>Description</th>
                            <th>Branch Code</th>
                            <th>Actions</th>

                        </tr>
                    </table>
                </div>
                <div class="col-md-2"></div>
            </div>
        </form>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-6">
                <button id="submitForm" class="btn btn-primary btn-md  form-control"> Submit </button>
            </div>
            <div class="col-md-2">
                <button id="create_new_rows_button" class="btn btn-primary form-control">Add Task</button>

            </div>
            <div class="col-md-2"></div>
        </div>
    </div>
    <script src="./addData.js"></script>
</body>

</html>