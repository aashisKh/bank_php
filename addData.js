// stores all input field data
let inputDetails = [] 

// checks if the row is created or not.
let is_row_created = false

// to handle table rows. making variable of that table
const bank_table = document.getElementById("bank_table")

// check if all the input fields are filled properly
let is_all_data_ready = false


// this function runs every time when the user enter data into the input field and if 
// all the input field are not filled properly then add task button will be disabled until all
// fields are filled properly
const check_if_all_row_filled = (e) => {

    let a = $("#new_data_form").serializeArray()
    for (let i = 0; i < a.length; i++) {
        if (a[i].value == "" && a[i].name != "date") {
            is_all_data_ready = false
            break
        } else {
            is_all_data_ready = true
        }
    }
    if (is_all_data_ready == true) {
        $("#create_new_rows_button").prop('disabled', false)

    }
    if (is_all_data_ready == false) {
        $("#create_new_rows_button").prop('disabled', true)

    }
}

// this function creates the rows.
const create_row = () => {
    $("#create_new_rows_button").prop('disabled', true)

    const input_names = ["taskname", "devicename", "description", "branchcode"]

    for (let i = 1; i <= 1; i++) {
        const tr = document.createElement("tr")

        for (let j = 0; j < 4; j++) {
            const td = document.createElement("td")
            const input = document.createElement("input")
            input.addEventListener("keyup", (e) => {

                if (e.code == 'Backspace') {
                    check_if_all_row_filled()
                } else {
                    check_if_all_row_filled()
                }
            })

            input.name = input_names[j]
            input.type = 'text'
            td.appendChild(input)
            tr.appendChild(td)
        }

        const action_id = document.createElement("td")
        action_id.setAttribute("class", "actions")
        action_id.textContent = "X"
        action_id.addEventListener("click", (e) => {

            const a = document.querySelectorAll("#bank_table tr:not(.new_row_table_heading)")
            if (a.length == 1) {
                alert('Cannot delete all rows');
            } else {
                (e.target.parentElement.remove())
            }

        })
        tr.appendChild(action_id)

        bank_table.appendChild(tr)


    }
}





// when add task button is clicked then it fires the create_row() function and creates the new row.
document.getElementById("create_new_rows_button").onclick = (e) => {
    e.preventDefault()
    let count = document.getElementById("row_number")
    is_row_created = true
    if (is_row_created == true) {
        create_row()
    }

}


// when submit button is clicked then this function will run. if all the input are filled then only user 
// can submit the form. if not then user cannot submit the form.
document.getElementById("submitForm").onclick = async (e) => {
    e.preventDefault()
    inputDetails = []

    if (is_all_data_ready == true) {
        let a = $("#new_data_form").serializeArray()
        console.log(a)
        inputDetails.push({ empcode: a[0].value, date: a[1].value == '' ? new Date().toJSON().slice(0, 10) : a[1].value, allTasks: [] })

        for (let i = 2; i < a.length; i = i + 4) {
            const newObj = {}
            const pie = (a.slice(i, i + 5))
            newObj.taskname = pie[0].value.trim()
            newObj.devicename = pie[1].value.trim()
            newObj.description = pie[2].value.trim()
            newObj.branchcode = pie[3].value.trim()
            inputDetails[0][`allTasks`].push(newObj)
        }

        let formData = new FormData()
        formData.append("userData", JSON.stringify(inputDetails))

        let data = await fetch("saveUserData.php", {
            method: "POST",
            body: formData

        })

        const d = await data.text()
        console.log(d)
        let json = JSON.parse(d)
        if (json.msg == "success") {
            alert("Task is added successfully")
            window.location.href = "./displayDataList.php"

        }
        if (json.msg == "failed") {
            alert("Error: " + json.error)
        }


    } else {
        alert("cannot leave field empty")
    }

}

create_row()
$("#create_new_rows_button").prop('disabled', true)

$("#emp_code").keyup(function () {
    check_if_all_row_filled()
})
