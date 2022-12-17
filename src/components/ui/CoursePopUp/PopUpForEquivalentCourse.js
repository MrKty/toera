import "../../../index"
import style from "./coursePopUp.module.css"
import CoursesTable from "./Tables/HostCourses"
import {useEffect} from "react";



import React, {useState} from 'react';
import {handleRequests} from "../../../pages/requests";
import NavigationBar from "../NavigationBar/NavigationBar";

let loaded = false

function Modal(props) {


    const [arr, setArr] = useState();
    const [closePop, setPop] = useState();
    const [eqCourseData, setEqCourseData] = useState([])
    const [isLoading, setLoading] = React.useState(true)

    const bilkentCourse = props.bilkentCourse
    const eqCourses = props.eqCourses
    console.log(bilkentCourse)
    console.log(eqCourses)

    if(!loaded) {
        handleRequests(null, {"courses": eqCourses.find(
                course => course.courseCode === bilkentCourse.courseCode
            ).foreignUniversities.find(
                university => university.universityName === props.hostUniName
            ).exemptedCourses}, "preapproval-student-popup", "1", (response, status) => {
            console.log("response" + response)
            setEqCourseData(response.eqCourseData)
            loaded = true
            setLoading(false)
        })

    }

    if (isLoading) {
        return <div className={"Page"}>
            <NavigationBar/>
            <div className="App">Loading...</div>
        </div>;
    }

    function cancelHandler() {
        props.onCancel();
    }
    function selectHandler() {

        props.setArrFunc(arr)

        props.onCancel()
    }
    function handleNominateNewCourse() {

        props.setNumFunc(bilkentCourse)

        props.onCancel()
    }


    if (closePop) {
        selectHandler()
        setPop(false)

    }

    return(
        <div className={"perfectCentered"} >
            <div className={style.modal}>
                <h4>Select an Equivalent Course For {bilkentCourse.courseCode} From The List</h4>
                <h6>or</h6>
                <button onClick={handleNominateNewCourse}>Nominate A New Course</button>
                <a className={style.close} onClick={cancelHandler}>×</a>
                <br/> <br/>

                <CoursesTable setArrFunc={setArr} closePopUp={setPop} selectedBilkentCourse={props.bilkentCourse} ></CoursesTable>

            </div>
        </div>
    )

}
export default Modal;