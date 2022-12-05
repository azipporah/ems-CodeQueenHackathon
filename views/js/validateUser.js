// function validate() {
//     e.preventDefault()
//     const userName = document.login.username.value
//     const userPassword = document.login.password.value
//     const userRole = document.login.role.value

//     role.onchange = function () {
//         // let roleOption = this.value

//         if (userRole == "admin") {
//             location.href = 'http://localhost:4040/adminPage'
//         }
//         else if (userRole == "hospital") {
//             location.href = 'http://localhost:4040/hospitalPage'
//         }
//         else if (response.status === 403 || response.status === 401) {
//             location.href = 'http://localhost:4040/login'
//         }

//     }

//     const alphaDigit = 0
//     const alpha = /[a-zA-Z]/
//     const digit = /[0-9]/

//     for (let i = 0; i < userName.length; i++) {
//         ch = userName.charAt(i)
//         const space = 0
//         if (ch = " ") {
//             space = 1
//         }
//     }

//     if (userPassword.match(alpha) && userPassword.match(digit))
//         alphaDigit = 1

//     if (space = 1) {
//         alert("Enter username without space!")
//         return false
//     }
//     else if (userName = "" || length < 5) {
//         alert("Provide a username longer than 5characters")
//         return false
//     }
//     else if (userPassword = "" || length < 5) {
//         alert("Provide a password longer than 5characters")
//         return false
//     }
//     else if (alphaDigit = 0) {
//         alert("Enter atleast one letter and aleast one number")
//         return false
//     }
// }

const url = "http://localhost:4040/login";

const loginBtn = document.getElementById('login');
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

//User login
const userLogin = (user) => {
    const userData = JSON.stringify(user);
    fetch(url, {
        method: "POST",
        body: userData,
        auth: {
             email: email,
            // username: username,
            // role: role,
            password: password
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })
        .then((res => res.json()))
        .then((data) => {
            console.log(data);
            const { token, user } = data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'admin') { //*****************error on role */
                window.location.href = 'http://localhost:4040/adminPage';
            }
            else if (user.role === 'hospital') {
                window.location.href = 'http://localhost:4040/hospitalPage';
            }
            else {
                window.location.href = 'http://localhost:4040/publicPage';
            }
            
        })
        .catch((error) => {
            console.log(error)
        })
}
//Add eventlistener
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    // const role = roleInput.value;
    const password = passwordInput.value;
    const user = { email, password };
    if (email === "" || password === "") {
        alert("All fields are required");
    } else {
        userLogin(user);
    }
})