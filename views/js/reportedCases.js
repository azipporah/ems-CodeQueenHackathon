link = "http://localhost:4040/caseReport"


//create a todo
const createTodo = (todo) => {
    const todoData = JSON.stringify(todo)
    fetch("http://localhost:4040/caseReport", {
        method: "POST",
        body: todoData,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            addTodoElement(data)

        }).catch((error) => { console.log(error) })
}



//fetching all the todos
const fetchAllTodos = (todo) => {
    const todoData = JSON.stringify(todo);
    fetch(link, {
        method: "GET",
        body: todoData,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            data.forEach((todo) => {
                addTodoElement(todo)
            })
        })
        .catch((error) => { console.log(error) })

}
fetchAllTodos();//invoking the fetchAllTodos funtion


const pName = document.getElementById('p_name');
const pAge = document.getElementById('p_age');
const pContact = document.getElementById('pcontact');
const pDistrict = document.getElementById('rdistrict');
const rContact = document.getElementById('rcontact');
const rDesc = document.getElementById('rdesc');
const rDate = document.getElementById('dor');

const save = document.getElementById('report');

const tableBody = document.getElementById('tableBody');

// creat a function 'addTodoElement' so that we can reuse the tableRow and todoTd
const addTodoElement = (newReport) => {
    // these names must be the same as in the schema
    const { personName, age, personContact, district, reporterContact, description, dateOfReport} = newReport
    const tableRow = document.createElement("tr");

    const pNameTd = document.createElement("td");
    pNameTd.innerHTML = personName;
    tableRow.appendChild(pNameTd)

    const pAgeTd = document.createElement("td");
    pAgeTd.innerHTML = age;
    tableRow.appendChild(pAgeTd)

    const pContactTd = document.createElement("td");
    pContactTd.innerHTML = personContact;
    tableRow.appendChild(pContactTd)

    const pDistrictTd = document.createElement("td");
    pDistrictTd.innerHTML = district;
    tableRow.appendChild(pDistrictTd)

    const rContactTd = document.createElement("td");
    rContactTd.innerHTML = reporterContact;
    tableRow.appendChild(rContactTd)

    const rDescTd = document.createElement("td");
    rDescTd.innerHTML = description;
    tableRow.appendChild(rDescTd)

    const rDateTd = document.createElement("td");
    rDateTd.innerHTML = dateOfReport;
    tableRow.appendChild(rDateTd)

    tableBody.appendChild(tableRow);

}

//pick values to given element
const getElementValue = (element) => {
    return element.value
}

// on button click
save.addEventListener("click", (event) => {
    event.preventDefault();

    // picks the value of the first name
    const p_name = getElementValue(pName)
    const p_age = getElementValue(pAge)
    const p_contact = getElementValue(pContact)
    const p_district = getElementValue(pDistrict)
    const r_contact = getElementValue(rContact)
    const r_desc = getElementValue(rDesc)
    const r_date = getElementValue(rDate)

    // const todoValue = getElementValue({ username, email, role, password });
    const todo = { personName: p_name, age: p_age, personContact: p_contact, district: p_district, reporterContact: r_contact, description: r_desc, dateOfReport: r_date }
    console.log(todo);
    createTodo(todo)// invokes the createTodo function
    // location.reload()


})
