const express = require('express')
const User = require("../models/user");
const router = new express.Router()
const path = require('path')
const multer = require('multer')
const convertToJson = require('../convertor/convertToJson')
const fs = require('fs')
const {forEach} = require("react-bootstrap/ElementChildren")
const Department = require("../models/department")
const University = require("../models/university")
const BilkentCourse = require("../models/bilkentCourse")
const ForeignUniversityCourse = require("../models/foreignUniversityCourse")
const ErasmusCandidate = require("../models/erasmusCandidate");
const Application = require("../models/application");

// storage engine for multer
const storageEngine = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname + path.extname(file.originalname)
        );
    },
});

// initialize multer
const upload = multer({
    storage: storageEngine,
});

const acceptedIdList = []
const applicantIdList = []

function createAcceptedList(students, placedStudents) {
    const keys = Object.keys(students["Placed"][0]);
    const values = Object.values(students["Placed"][0]);
    for (let i = 1; i < students["Placed"].length; i++) {
        let placedStudent = {};
        for (let j = 0; j < keys.length; j++) {
            placedStudent[values[j]] = students["Placed"][i][keys[j]]
        }
        placedStudents.push(placedStudent)
        acceptedIdList.push(placedStudent.id)
    }
    const content = JSON.stringify(placedStudents)

    fs.writeFile('./public/files/acceptedStudents.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function createApplicantList(students, rankedApplicants) {
    const keys = Object.keys(students["Sayfa1"][0]);
    const values = Object.values(students["Sayfa1"][0]);
    for (let i = 1; i < students["Sayfa1"].length; i++) {
        let rankedApplicant = {};
        for (let j = 1; j < keys.length; j++) {
            let value = students["Sayfa1"][i][keys[j]] || "";
            rankedApplicant[values[j]] = value.toString()
        }
        rankedApplicants.push(rankedApplicant)
        applicantIdList.push(rankedApplicant["Student ID Number"])
    }
    const content = JSON.stringify(rankedApplicants)
    fs.writeFile('./public/files/rankedApplicants.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function saveApplicantsIDs() {
    const content = JSON.stringify(applicantIdList)
    fs.writeFile('./public/files/applicantsIds.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function createWaitingList(rankedApplicants, waitingList) {
    for (let i = 0; i < rankedApplicants.length; i++) {
        if (!acceptedIdList.includes(rankedApplicants[i]["Student ID Number"])) {
            waitingList.push(rankedApplicants[i])
        }
    }
    const content = JSON.stringify(waitingList)
    fs.writeFile('./public/files/waitingList.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}


async function createCandidates(rankedApplicants, placedStudents) {
    const counter = 0
    for (let i = 0; i < placedStudents.length; i++) {
        const university = await University.findOne({"name": placedStudents[i].placement})
        const departments = ["CS"]
        const candidateDepartments = []
        // Do NOT use forEach with await functions, use this method instead
        await Promise.all(departments.map(async (e) => {
            const department = await Department.findOne({"name": e.name})
            candidateDepartments.push({"id": department._id, "type": e.type})
        }))
        const userDict = {
            name: placedStudents[i].name,
            surname: placedStudents[i].surname,
            active: true,
            email: "mail" + counter + "@example.com",
            password: "abcd123.",
            erasmusCandidateData: {
                isActiveCandidate: true,
                totalPoints: placedStudents[i].total,
                preferredSemester: placedStudents[i].duration.includes("Bahar") ? 1 : 0,
                nominatedUniversityId: university._id,
                departments: candidateDepartments,
                studentId: placedStudents[i].id
            }
        }
        const user = new User(userDict);
        const application = await Application.createApplication(user)
        await application.save()
        await user.save()
    }
}

// routing
router.post('/upload-excel', upload.single('applicantListsExcel'), async (req, res) => {
    res.json(req.file).status(200);
    const students = convertToJson("applicantListsExcel.xlsx");
    let placedStudents = [];
    let rankedApplicants = []
    let waitingList = []
    createApplicantList(students, rankedApplicants);
    createAcceptedList(students, placedStudents);
    createWaitingList(rankedApplicants, waitingList)
    saveApplicantsIDs()
    //await createCandidates(rankedApplicants, placedStudents)
});


function parsePreviouslyAcceptedCourses(courseList) {
    const courses = convertToJson("previouslyAcceptedCoursesExcel.xlsx");
    // Desired Keys
    const keys = ['B', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L', 'M'];
    const values = [
        "Host University's Name",
        "Host University's Course Code",
        "Host University's Course Name",
        'ECTS',
        'Original',
        'Exempted Bilkent Course Code',
        'Exempted Bilkent Course Name',
        'Exempted Bilkent Course Credit',
        'Exempted Bilkent Course Designation',
        'Exemption',
    ]
    const csCourses = ["CS"]
    for (let i = 1; i < courses["PRE APPROVAL "].length; i++) {
        let course = {}
        if (courses["PRE APPROVAL "][i]['A'] === "Erasmus" &&
            ((courses["PRE APPROVAL "][i]['L'] && courses["PRE APPROVAL "][i]['L'].includes("CS"))
            || (courses["PRE APPROVAL "][i]['I'] && courses["PRE APPROVAL "][i]['I'].includes("CS")))
            && (courses["PRE APPROVAL "][i]['F'] || courses["PRE APPROVAL "][i]['G'])
            && courses["PRE APPROVAL "][i]['K']
        ) {
            for (let j = 0; j < keys.length; j++) {
                let value = courses["PRE APPROVAL "][i][keys[j]] || "";
                course[values[j]] = value.toString()
            }
            courseList.push(course)
        }
    }
    const content = JSON.stringify(courseList)
    fs.writeFile('./public/files/previouslyAcceptedCourses.txt', content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}


router.post('/upload-courses-excel', upload.single('previouslyAcceptedCoursesExcel'), async (req, res) => {
    const courseList = []
    res.json(req.file).status(200);
    parsePreviouslyAcceptedCourses(courseList);
    console.log(courseList)

    // Do NOT use forEach with await functions, use this method instead
    await Promise.all(courseList.map(async (course) => {
        const university = await University.findOne({name: course["Host University's Name"]})
        if (university) {
            let foreignCourse = await ForeignUniversityCourse.findOne({courseCode: course["Host University's Course Code"]})
            if (foreignCourse === null) {
                const foreignCourseDict = {
                    name: course["Host University's Course Name"],
                    courseCode: course["Host University's Course Code"],
                    universityName: course["Host University's Name"],
                    ectsCredits: course["ECTS"] ? course["ECTS"] : course["Original"],
                }
                foreignCourse = await new ForeignUniversityCourse(foreignCourseDict)
                await foreignCourse.save()
            }
            if (course["Exempted Bilkent Course Code"] === "-" || course["Exempted Bilkent Course Code"] === ""){
                course["Exempted Bilkent Course Code"] = course["Exemption"]
            }
            let bilkentCourse = await BilkentCourse.findOne({courseCode: course["Exempted Bilkent Course Code"]})
            if (bilkentCourse === null) {
                const bilkentCourseDict = {
                    name: course["Exempted Bilkent Course Name"],
                    department: "CS",
                    courseCode: course["Exempted Bilkent Course Code"],
                    courseType: course["Exempted Bilkent Course Designation"],
                    ectsCredits: course["Exempted Bilkent Course Credit"],
                    foreignUniversities: [
                        {
                            universityName: university.name,
                            universityID: university._id,
                            exemptedCourses: [{
                                courseName: foreignCourse.name,
                                courseID: foreignCourse._id
                            }
                            ]
                        }
                    ]
                }
                bilkentCourse = await new BilkentCourse(bilkentCourseDict)
            } else {
                const foreignUnis = bilkentCourse.foreignUniversities
                foreignUnis.forEach((uni) => {
                    if(uni.universityID === university._id){
                        uni.exemptedCourses.push({
                            courseName: foreignCourse.name,
                            courseID: foreignCourse._id
                        })
                    }
                })
                bilkentCourse.foreignUniversities = foreignUnis
            }
            await bilkentCourse.save()
        }
    }))
});


router.post('/applicants-list', async (req, res) => {
    try {
        let response;
        let list;
        // 0 POST, 1 GET
        if (req.body.type === "0") {
            delete req.type
            response = res.status(201)
        } else {
            if (req.body.listType === 1) {
                fs.readFile('./public/files/rankedApplicants.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    list = JSON.parse(data)
                    res.status(302).send(list)
                });
            } else if (req.body.listType === 2) {
                fs.readFile('./public/files/acceptedStudents.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    list = JSON.parse(data)
                    res.status(302).send(list)
                });
            } else if (req.body.listType === 3) {
                fs.readFile('./public/files/waitingList.txt', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    list = JSON.parse(data)
                    res.status(302).send(list)
                });
            }
            response = res.status(302)
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router