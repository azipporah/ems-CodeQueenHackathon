const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')

// schema imports
const signupSchema = require('../models/signup.schema') //importing the userSchema file
const districtSchema = require('../models/district.schema') //importing the userSchema file
const hospitalSchema = require('../models/hospital.schema') //importing the hospitalSchema file
const recoveredSchema = require('../models/recovered.schema') //importing the recoveredSchema file
const deceasedSchema = require('../models/deceased.schema') //importing the deceasedSchema file


// ................POST ROUTES.........
// post route for users
router.post("/signup", [
    check("email", "Please provide a valid email!").isEmail(),
    check("password", "Password should be greater than 3characters.").isLength({ min: 3 })
], async (req, res) => {
    const user = req.body
   
    // checking for empty fields
    if (!user.username) {
        return res.status(400).json({ 'message': 'Username required!!' })
    } else if (!user.email) {
        return res.status(400).json({ 'message': 'Email required!!' })
    } else if (!user.password) {
        return res.status(400).json({ 'message': 'Password required!!' })
    }
    // else if (!user.role) {
    //     return res.status(400).json({ 'message': 'Role required!!' })
    // }

    // validate user input
    const errors = validationResult(req) //validationResult method from express-validator does the validation
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    let hashedPassword = await bcrypt.hash(user.password, 10)

    const addUser = new signupSchema({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });
    

    try {
        await addUser.save()
        return res.status(201).send(addUser)
    } catch (error) {
        // res.status(400).send(error)
        console.log(error);
    }

    res.send("Validation Passed!!")
})

//posting districts
router.post("/districts", async (req, res) => {
    const district = req.body
    const newDis = new districtSchema(district)
    try {
        await newDis.save()
        return res.status(201).send(newDis)
    } catch (error) {
        // res.status(400).send(error)
        console.log(error);
    }
})

//posting hospitals
router.post("/hospitals", async (req, res) => {
    const hospital = req.body

    let hashedHospitalPassword = await bcrypt.hash(hospital.password, 10)
    const newHos = new hospitalSchema({
        hospital_name: req.body.hospital_name,
        location: req.body.location,
        capacity: req.body.capacity,
        status: req.body.status,
        password: hashedHospitalPassword
    })
    try {
        await newHos.save()
        return res.status(201).send(newHos)
    } catch (error) {
        // res.status(400).send(error)
        console.log(error);
    }
})

//posting recovered cases
router.post("/recoveredCase", async (req, res) => {
    const recovered_case = req.body
    const newRecovery = new recoveredSchema(recovered_case)
    try {
        await newRecovery.save()
        return res.status(201).send(newRecovery)
    } catch (error) {
        // res.status(400).send(error)
        console.log(error);
    }
})

//posting deceased cases
router.post("/deceasedCase", async (req, res) => {
    const deceased_case = req.body
    const newDeath = new deceasedSchema(deceased_case)
    try {
        await newDeath.save()
        return res.status(201).send(newDeath)
    } catch (error) {
        // res.status(400).send(error)
        console.log(error);
    }
})

// ................GET ROUTES.........
//fetching all users
router.get("/all-signups", async (req, res) => {
    signupSchema.find().then((users) => {
        res.status(200).send(users)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

//fetching all districts
router.get("/all-districts", async (req, res) => {
    districtSchema.find().then((districts) => {
        res.status(200).send(districts)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

//fetching all hospitals
router.get("/all-hospitals", async (req, res) => {
    hospitalSchema.find().then((hospitals) => {
        res.status(200).send(hospitals)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

//fetching all recovered cases
router.get("/all-recovered-cases", async (req, res) => {
    recoveredSchema.find().then((recoveredCase) => {
        res.status(200).send(recoveredCase)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

//fetching all deceased cases
router.get("/all-deceased-cases", async (req, res) => {
    deceasedSchema.find().then((deceasedCase) => {
        res.status(200).send(deceasedCase)
    }).catch((error) => {
        res.status(400).send(error)
    });
});


module.exports = router