const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const appliedStudent = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {_id: false});


const feedback = mongoose.Schema({
    feedbackContent: {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        default: 0
    },
    feedbackOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {_id: false});


const languageRequirement = mongoose.Schema({
    language: {
        type: String,
        required: true
    }

}, {_id: false});


const department = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: "noDepartment",
        ref: 'Department'
    },
    //0 major, 1 minor
    type: {
        type: Number,
        default: 0
    }
}, { _id : false });


const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    departments:[department],

    universityId: {
        type: Number,
        default: 0
    },

    applicationLink: {
        type: String,
        default: 'No application link provided...'
    },
    
    mobilityPeriod: {
        type: String,
        required: true
    },

    quota: {
        type: Number,
        default: 2
    },

    semester: {
        type: String,
        default: "Fall"
    },

    
    // userType: {
    //     type: Number,
    //     default: 0,
    //     validate(value) {
    //         if(value < 0) {
    //             throw new Error('User Type must be greater than zero')
    //         }
    //     }
    // },
    
    feedbacks: [feedback],
    
    appliedStudents: [appliedStudent],

    erasmusCode: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    countryCode: {
        type: String,
        //required: true
    },

    languageRequirements: [languageRequirement]

}, {
    timestamps: true
})


/*
userSchema.virtual('university', {
    ref: 'University',
    localField: '_id',
    foreignField: 'owner'
})
*/



universitySchema.methods.toJSON = function () {
    const university = this
    const universityObject = university.toObject()
    
    return universityObject
}


universitySchema.statics.findByName = async (name) => {
    const university = await University.findOne({name})

    if(!university) {
        throw new Error('Unable to find the university')
    }

    return university
}

const University = mongoose.model('University', universitySchema)

module.exports = University