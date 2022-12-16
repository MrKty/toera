const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const BilkentCourse = require("../models/bilkentCourse")
const router = new express.Router()

router.post('/profile-others-incoming', async (req, res) => {
    console.log("entered profile course router")
    try {

        let response;
        let user;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            user = await User.findOne({'tokens.token': req.body.token})
            console.log("user found: " + user.name + " " + user.surname)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({

            "name": user.name,
            "surname": user.surname,
            "email": user.email,
            "studentId": user.studentId,
            "department": user.department,
            "studyCycle": user.incomingStudentData.studyCycle,
            "sendingInstitution": user.incomingStudentData.sendingInstitution,

        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/profile-course', async (req, res) => {
    console.log("entered profile others incoming router")
    try {

        let response;
        let course;

        // 0 POST, 1 GET
        if (req.body.type === "1") {
            course = await BilkentCourse.findOne({'courseCode': req.body.courseCode})
            console.log("course found: " + course)
            response = res.status(201)
        } else {
            response = res.status(302)
        }

        console.log("sending responses...")

        response.send({
            "courseName": course.name,
            "courseCode": course.courseCode,
            "requiredLanguage": "English",
            "websiteLink": "No link provided.",
            "syllabusLink": "No link provided.",
            "university": "Bilkent",
            "ectsCredits": course.ectsCredits,
            "comments": "no comments yet"
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})



router.patch('/profile-course', auth, async (req, res) => {
})


module.exports = router