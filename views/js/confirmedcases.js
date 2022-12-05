// link = "http://localhost:4040/patients"


//create a todo
const createTodo = (todo) => {
    const todoData = JSON.stringify(todo)
    fetch("http://localhost:4040/patients", {
        method: "POST",
        body: todoData,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
        .then((data) => {
            // console.log(data);
            addTodoElement(data)

        }).catch((error) => { console.log(error) })
}



//fetching all the todos
const fetchAllTodos = (todo) => {
    const todoData = JSON.stringify(todo);
    fetch("http://localhost:4040/patients", {
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


const Patientname = document.getElementById('pname');
const Patientage = document.getElementById('pAge');
const Patientdistrict = document.getElementById('pdistrict');
const Patientdoe = document.getElementById('doe');
const Patientcontact = document.getElementById('pcontact');
const Patientnok = document.getElementById('kin');
const Patientnokc = document.getElementById('kcontact');
const Patientdesc = document.getElementById('pdesc');

const save = document.getElementById('psave');



const tableBody = document.getElementById('tableBody');

// creat a function 'addTodoElement' so that we can reuse the tableRow and todoTd
const addTodoElement = (newCase) => {
    const { Patientname, Patientage, Patientdistrict, Patientdoe, Patientcontact, Patientnok, Patientnokc, Patientdesc } = newCase
    const tableRow = document.createElement("tr");

    const PatientnameTd = document.createElement("td");
    PatientnameTd.innerHTML = Patientname;
    tableRow.appendChild(PatientnameTd)

    const PatientageTd = document.createElement("td");
    PatientageTd.innerHTML = Patientage;
    tableRow.appendChild(PatientageTd)

    const PatientdistrictTd = document.createElement("td");
    PatientdistrictTd.innerHTML = Patientdistrict;
    tableRow.appendChild(PatientdistrictTd)

    const PatientdoeTd = document.createElement("td");
    PatientdoeTd.innerHTML = Patientdoe;
    tableRow.appendChild(PatientdoeTd)

    const PatientcontactTd = document.createElement("td");
    PatientcontactTd.innerHTML = Patientcontact;
    tableRow.appendChild(PatientcontactTd)

    const PatientnokTd = document.createElement("td");
    PatientnokTd.innerHTML = Patientnok;
    tableRow.appendChild(PatientnokTd)

    const PatientnokcTd = document.createElement("td");
    PatientnokcTd.innerHTML = Patientnokc;
    tableRow.appendChild(PatientnokcTd)

    const PatientdescTd = document.createElement("td");
    PatientdescTd.innerHTML = Patientdesc;
    tableRow.appendChild(PatientdescTd)


    tableBody.appendChild(tableRow);

}

//pick values to given element
// const getElementValue = (element) => {
//     return element.value;
// }

const getElementValue = (element) => {
    return element.value
}

// on button click
save.addEventListener("click", (event) => {
    event.preventDefault();

    // picks the value of the first name
    const Pname = getElementValue(Patientname)
    const Page = getElementValue(Patientage)
    const Pdistrict = getElementValue(Patientdistrict)
    const Pdoe = getElementValue(Patientdoe)
    const Pcontact = getElementValue(Patientcontact)
    const Pnok = getElementValue(Patientnok)
    const Pnokc = getElementValue(Patientnokc)
    const Pdesc = getElementValue(Patientdesc)

    // const todoValue = getElementValue({ username, email, role, password });
    const todo = { Patientname: Pname, Patientage: Page, Patientdistrict: Pdistrict, Patientdoe: Pdoe, Patientcontact: Pcontact, Patientnok: Pnok, Patientnokc: Pnokc, Patientdesc: Pdesc }
    console.log(todo);
    createTodo(todo)// invokes the createTodo function


})