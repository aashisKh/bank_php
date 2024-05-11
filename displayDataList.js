
let desc_box_x = 0
let desc_box_y = 0


window.onclick = (e) => {
    console.log(e)
    if(e.target.className.split(" ").includes("show_more_design")){
        e.preventDefault()
        desc_box_x = e.clientX
        desc_box_y = e.clientY
        console.log(desc_box_y)
    
        let d = document.createElement("div")
        d.style.marginLeft = desc_box_x + 'px'
        d.style.marginTop = desc_box_y + 'px'
        d.style.backgroundColor = 'red'
        d.style.height = '100px'
        d.style.width = '300px'
        d.style.position = 'absolute'
        d.style.top = '0'

    
        document.body.appendChild(d)
    }

}

// this function runs when user clicks delete button.
// this function sends current clicked row id to database and delets from database.
const delete_row_from_database = async (id) => {
    const row_id = new FormData()
    row_id.append("id", id)
    const response = await fetch("deleteRow.php", {
        method: "POST",
        body: row_id
    })
    const res = await response.text()
}

// this function is to fetch all the data from the database and display them like table structures
const fetchd = async () => {
    $("#bank_table_list").children().not(':first').remove();

    let bank_table_list = document.getElementById("bank_table_list")

    const user = new FormData()
    user.append("type", "all")

    let d = await fetch("getDataById.php", {
        method: "POST",
        body: user
    })

    let res = await d.json()
    let headings = ["ID", "empcode", "taskname", "devicename", "description", "branchcode", "workdate"]
    res.forEach((data) => {

        let tr = document.createElement("tr")
        tr.setAttribute("data-id", data[headings[0]])
        for (let i = 1; i <= 6; i++) {
            let td = document.createElement("td")

            td.innerText = data[headings[i]]
            if (headings[i] == 'description' && data[headings[i]].length > 25) {
                let orginalText = data[headings[i]]
                let cloneText = [...data[headings[i]]]
                td.innerText = cloneText.join("").slice(0, 20)
                let span = document.createElement("span")
                span.setAttribute("role", "button")
                

                span.addEventListener("click", (e) => {



                    // $("#show_more_text").text(orginalText)
                    // $("#show_more").show()
                })
                span.setAttribute("class", "bg-primary text-white text-center cursor-pointer rounded show_more_design")
                span.textContent = '+'

                td.appendChild(span)
            }
            tr.appendChild(td)
        }
        let actions = document.createElement("td")

        let update = document.createElement("span")
        update.textContent = "Edit"

        update.setAttribute("class", "actions_buttons update")
        // when edit button is clicked then this function shows update modal box and then allows users to update data.
        update.addEventListener("click", (e) => {
            $("#updateModal").show()
            document.getElementById("update_id").value = e.target.parentElement.parentElement.getAttribute("data-id")
            document.getElementById("update_empcode").value = e.target.parentElement.parentElement.children[0].innerText
            document.getElementById("update_tname").value = e.target.parentElement.parentElement.children[1].innerText
            document.getElementById("update_dname").value = e.target.parentElement.parentElement.children[2].innerText
            document.getElementById("update_description").value = e.target.parentElement.parentElement.children[3].innerText

            document.getElementById("update_bcode").value = e.target.parentElement.parentElement.children[4].innerText

            document.getElementById("update_date").value = e.target.parentElement.parentElement.children[5].innerText
        })




        let del = document.createElement("span")
        del.textContent = "Delete"
        del.setAttribute("class", "actions_buttons delete")
        del.addEventListener("click", (e) => {
            if (confirm("Are u sure to delete this data from database")) {
                e.target.parentElement.parentElement.remove()
                delete_row_from_database(parseInt(e.target.parentElement.parentElement.getAttribute("data-id")))

            }
        })
        actions.appendChild(update)
        actions.appendChild(del)
        tr.appendChild(actions)
        bank_table_list.appendChild(tr)

    })


}


// this function is for search data in tables.
let searchUsername = document.getElementById("search_ID")
searchUsername.onkeyup = (e) => {
    let searchValue = e.target.value
    const regex = new RegExp(searchValue, 'i')
    let selectedRows = document.querySelectorAll("#bank_table_list tr:not(.bank_table_list_heading)")

    $.each(selectedRows, (index, value) => {
        let regx = new RegExp(searchValue, 'gi')
        let test = regex.test((value.children[0].innerText))
        if (test == false) {
            $(value).hide("fast")
        } else {
            let spa = document.createElement("span")
            spa.innerText = ""
            spa.innerText = searchValue
            let d = value.children[0].innerText.replace(regx, `<b class="bold">${spa.innerText}</b>`)
            value.children[0].innerHTML = d
            $(value).show("fast")
        }



    })

}


// this function runs when user update the data and clicks update button.
document.getElementById("update_Data").onclick = async () => {
    let update_form_data = $("#update_form").serializeArray()

    let update_object_data = {
        id: update_form_data[0].value,
        empcode: update_form_data[1].value,
        taskname: update_form_data[2].value,
        devicename: update_form_data[3].value,
        description: update_form_data[4].value,
        branchcode: update_form_data[5].value,
        date: update_form_data[6].value
    }
    let update_form_data_list = new FormData()
    update_form_data_list.append("update_list", JSON.stringify(update_object_data))
    const update_response = await fetch("updateData.php", {
        method: "POST",
        body: update_form_data_list
    })
    const response_text = await update_response.text()
    if (response_text == "false") {
        alert("Sorry some error")
    } else {
        alert("Data is updated successfully")
        $("#updateModal").hide()
        fetchd()

    }
}

$("#close_modal").click(() => {
    $("#updateModal").hide()
})
$("#updateModal").hide()

$("#show_more").click(function (e) {
    if (e.target.id == 'show_more') {
        $("#show_more").hide()
    }
})
$("#show_more").hide()
fetchd()

