const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signupSchema = require('../models/signup.schema') //importing the userSchema file

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

        // checking if email is already in use
        let  usedEmail =  signupSchema.find(addUser => {
            return usedEmail.email === email
        })
        if (usedEmail) {
            res.json({
                message: "Email already in use, try another email."
            })
        }

        // saving the validated user the database
        addUser.save()
            .then(addUser => {
                res.json({
                    message: "New user added successfully"
                })
            })
            .catch(error => {
                res.json({
                    message: "Ooops, error occured!"
                })
                console.log(error);
            })
    })

}

// Login functionality
const login = async (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

   signupSchema.findOne({ email })
        .then(addUser => {
            if (addUser) {
                bcrypt.compare(password, addUser.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    if (result) {
                        let token = jwt.sign({ username: addUser.username }, 'verySecretValue', { expiresIn: '1h' })

                        res.json({
                            message: "Login successfull!!",
                            token
                        })

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
}

module.exports = {
    register, login
}


