const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signupSchema = require('../models/signup.schema') //importing the userSchema file
const hospitalSchema = require('../models/hospital.schema') //importing the userSchema file

// Registering functionality
const register = async (req, res, next) => {

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let addUser = new signupSchema({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            role: req.body.role
        })
        // console.log(addUser);

        signupSchema.findOne({ email: addUser.email }, function (err, user) {
            if (err) {
                //handle error here
            }

            //if a user was found, that means the user's email matches the entered email
            if (user) {                
                res.json({
                    message: "Email already in use, try another email."
                });
            } else {
                //code if no user with entered email was found

                // saving the validated user the database
                addUser.save()
                    .then(res.json({ message: "New user added successfully" }))
                    .catch(error => {
                        res.json({
                            message: "Ooops, error occured!"
                        })
                        console.log(error);
                    })
            }
        });
    })

}

// Login functionality
const login = async (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    let sameUser = await signupSchema.findOne({ email })
        .then(addUser => {
            if (addUser) {
                console.log(`user ${addUser.role}`);
                console.log("testing");
                bcrypt.compare(password, addUser.password, async (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    if (result) {
                        let token = jwt.sign({ username: addUser.username }, 'verySecretValue', { expiresIn: '1h' })
                        // let user = addUser.role
                        // console.log(user);
                        if (addUser.role === 'admin') {
                            res.redirect('/adminPage')
                            // window.location.href = 'http://localhost:4040/adminPage';
                        }
                        else if (addUser.role === 'hospital') {
                            res.redirect('/hospitalPage')
                            // window.location.href = 'http://localhost:4040/hospitalPage';
                        }
                        else {
                            res.redirect('/publicPage');
                            // window.location.href = 'http://localhost:4040/publicPage';
                        }

                        // res.json({
                        //     message: "Login successfull!!",
                        //     token

                        // })

                    } else {
                        res.json({
                            message: "Wrong password!!"
                        })
                    }
                })
            } else {
                res.json({
                    message: "User doesn't exists!!"
                })
            }
        })
    console.log(sameUser);
}

// hospital register functionality
const hospitalRegister = async (req, res, next) => {

    bcrypt.hash(req.body.hospitalPassword, 10, function (err, hashedPass) {
        if (err) {
            console.log(err);
            // res.json({
            //     error: err
            // })
        }
        let addHos = new hospitalSchema({
        hospitalName: req.body.hospitalName,
        hospitalEmail: req.body.hospitalEmail,
        hospitalDistrict: req.body.hospitalDistrict,
        hospitalCapacity: req.body.hospitalCapacity,
        hospitalStatus: req.body.hospitalStatus,
        hospitalPassword: hashedPass
        })
        // console.log(addUser);

        hospitalSchema.findOne({ hospitalEmail: addHos.hospitalEmail }, function (err, hospital) {
            if (err) {
                //handle error here
                console.log();
            }

            //if a user was found, that means the user's email matches the entered email
            if (hospital) {                
                res.json({
                    message: "Email already in use, try another email."
                });
            } else {
                // if no user with entered email was found
                addHos.save()
                    .then(res.json({ message: "New user added successfully" }))
                    .catch(error => {
                        // res.json({
                        //     message: "Ooops, error occured!"
                        // })
                        console.log(error);
                    })
            }
        });
    })

}


module.exports = {
    register, login, hospitalRegister
}


