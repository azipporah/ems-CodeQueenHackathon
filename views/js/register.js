link = "http://localhost:4040/signup"


//create a todo
const createTodo = (todo) => {
    const todoData = JSON.stringify(todo)
    fetch(link, {
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
    fetch("http://localhost:4040/signup", {
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


const username = document.getElementById('username');
const email = document.getElementById('email');
const role = document.getElementById('role');
const password = document.getElementById('password');
const save = document.getElementById('save');



const tableBody = document.getElementById('tableBody');

// creat a function 'addTodoElement' so that we can reuse the tableRow and todoTd
const addTodoElement = (newSignup) => {
    const { username, email, role, password } = newSignup
    const tableRow = document.createElement("tr");

    const usernameTd = document.createElement("td");
    usernameTd.innerHTML = username;
    tableRow.appendChild(usernameTd)

    const emailTd = document.createElement("td");
    emailTd.innerHTML = email;
    tableRow.appendChild(emailTd)

    const roleTd = document.createElement("td");
    roleTd.innerHTML = role;
    tableRow.appendChild(roleTd)

    const passwordTd = document.createElement("td");
    passwordTd.innerHTML = password;
    tableRow.appendChild(passwordTd)


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
    const Username = getElementValue(username)
    const Email = getElementValue(email)
    const Role = getElementValue(role)
    const Password = getElementValue(password)

    if (!Username) {
        return res.status(400).json({ 'message': 'Username required!!' })
    }
    else if (!Email) {
        return res.status(400).json({ 'message': 'Email required!!' })
    }
    else if (!Role) {
        return res.status(400).json({ 'message': 'Role required!!' })
    }
    else if (!Password) {
        return res.status(400).json({ 'message': 'Password required!!' })
    } else {
        // const todoValue = getElementValue({ username, email, role, password });
        const todo = { username: Username, email:Email, role: Role, password: Password }
        console.log(todo);
        createTodo(todo)// invokes the createTodo function
    }

})
