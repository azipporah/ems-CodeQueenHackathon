const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
// const { check, validationResult } = require('express-validator')

// schema imports
const signupSchema = require('../models/signup.schema') //importing the userSchema file
const districtSchema = require('../models/district.schema') //importing the userSchema file
const hospitalSchema = require('../models/hospital.schema') //importing the hospitalSchema file
const confirmedCaseSchema = require('../models/confirmedcases.schema') //importing the hospitalSchema file
const caseReportSchema = require('../models/reportedcases.schema') //importing the hospitalSchema file
const recoveredSchema = require('../models/recovered.schema') //importing the recoveredSchema file
const deceasedSchema = require('../models/deceased.schema') //importing the deceasedSchema file

// controller import
const authController = require('../controllers/authController')

// ................POST ROUTES.........
// post routes for users
router.post("/register", authController.register)

router.post("/login", authController.login)

router.post("/hospital", authController.hospitalRegister)

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
// router.post("/hospitals", async (req, res) => {
//     const hospital = req.body

//     let hashedHospitalPassword = await bcrypt.hash(hospital.hospitalPassword, 10)
//     const newHos = new hospitalSchema({
//         hospitalName: req.body.hospitalName,
//         hospitalEmail: req.body.hospitalEmail,
//         hospitalDistrict: req.body.hospitalDistrict,
//         hospitalCapacity: req.body.hospitalCapacity,
//         hospitalStatus: req.body.hospitalStatus,
//         hospitalPassword: hashedHospitalPassword
//     })
//     try {
//         await newHos.save()
//         return res.status(201).send(newHos)
//     } catch (error) {
//         // res.status(400).send(error)
//         console.log(error);
//     }
// })


//posting caseReports
router.post("/caseReport", async (req, res) => {
    const caseReport = req.body
    const caseReportInfor = new caseReportSchema(caseReport)
    try {
        await caseReportInfor.save()
        return res.status(201).send(caseReportInfor)
    } catch (error) {
        res.status(400).send(error)
    }
})

//posting confirmed cases-patients
router.post("/patients", async (req, res) => {
    const patient = req.body
    const patientInfor = new confirmedCaseSchema(patient)
    try {
        await patientInfor.save()
        return res.status(201).send(patientInfor)
    } catch (error) {
        res.status(400).send(error)
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

// authenticating admin login
// router.get("/authAdmin", function (req, res) {
//     const adminUsername = req.body.username;
//     const adminPassword = req.body.password;
//     if (!adminUsername || !adminPassword) {
//         res.status(401).send("You are not autorized!");
//     }
//     else {
//         res.render("adminPage");
//     }
// });

// // authenticating hospital login
// router.get("/authHospital", function (req, res) {
//     const hosUsername = req.body.hospitalUsername;
//     const hosPassword = req.body.hospitalPassword;
//     if (!hosUsername || !hosPassword) {
//         res.status(401).send("You are not autorized!");
//     }
//     else {
//         res.render("hospitalPage");
//     }
// });

//fetching all users
router.get("/signup", async (req, res) => {
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
router.get("/hospital", async (req, res) => {
    hospitalSchema.find().then((hospitals) => {
        res.status(200).send(hospitals)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

//fetching all reported cases
router.get("/caseReport", async (req, res) => {
    caseReportSchema.find().then((reportedCases) => {
        res.status(200).send(reportedCases)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

//fetching all confirmed cases/patients
router.get("/patients", async (req, res) => {
    confirmedCaseSchema.find({}).then((patients) => {
        res.status(200).send(patients)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

//fetching all recovered cases
router.get("/all-recovered-cases", async (req, res) => {
    recoveredSchema.find({}).then((recoveredCase) => {
        res.status(200).send(recoveredCase)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

//fetching all deceased cases
router.get("/all-deceased-cases", async (req, res) => {
    deceasedSchema.find({}).then((deceasedCase) => {
        res.status(200).send(deceasedCase)
    }).catch((error) => {
        res.status(400).send(error)
    });
});

// logout route
router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.send(error)
        }
        else{
            res.redirect('/publicPage');
        }
    })
})


module.exports = router