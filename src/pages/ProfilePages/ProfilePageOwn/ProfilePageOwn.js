import NavigationBar from "../../../components/ui/NavigationBar/NavigationBar";
import img from "../profile.png";
import classes from "./ProfilePageOwn.module.css";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import UploadSignaturePage from "../../../components/UploadSignaturePage";
import Backdrop from "../../../components/ui/CoursePopUp/Backdrop";
import { handleRequests } from "../../requests";

//0->outgoing student, 1->incoming student, 2->others
function ProfilePageOwn() {
  const [selectCourseIsOpen, setCourseIsOpen] = useState(false);

  function selectCourse() {
    setCourseIsOpen(true);
  }

  function closeSelectCourse() {
    setCourseIsOpen(false);
  }

  const user = jwt_decode(localStorage.getItem("token"));
  const [university, setUniversity] = useState();
  useEffect(() => {
    console.log("Here");
    const getUniversity = async () => {
      try {
        if (
          user.userType == 0 &&
          user.erasmusCandidateData.nominatedUniversityId
        ) {
          const res = await axios.get(
            `http://localhost:8080/university/${user.erasmusCandidateData.nominatedUniversityId}`,
            {}
          );
          console.log(res.data);
          setUniversity(res.data);
        }
      } catch (error) {
        console.log("There is a problem");
      }
    };

    getUniversity();
  }, []);

  const navigate = useNavigate();

  function goToApplicationStatus() {
    navigate("/application-page1");
  }

  if (user.userType == 0) {
    return (
      <div>
        <NavigationBar />
        <div className={classes["pp-container"]}>
          <div className={classes["pp-img-container"]}>
            <img className={classes["pp-img"]} alt="" src={img} />
          </div>
          <div className={classes["pp-center"]}>
            <table className={classes["pp-table"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}>
                    {user.name + " " + user.surname}
                  </h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Bilkent ID:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  {user.erasmusCandidateData.studentId}
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>E-Mail:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>{user.email}</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Department:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>Computer Science</td>
              </tr>
            </table>
          </div>
          <div className={classes["pp-center"]}>
            <table className={classes["pp-table"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}> </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}> </h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Study Cycle:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>Bachelor's</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>
                  Receiving Institution:
                </td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  {university ? university.name : ""}
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Erasmus Points:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  {user.erasmusCandidateData.totalPoints}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={classes["pp-center"]}>
          <button
            className={classes["pp-button"]}
            onClick={goToApplicationStatus}
          >
            Application Status
          </button>
        </div>
        <div className={classes["pp-center"]}>
          <button className={classes["pp-button"]} onClick={selectCourse}>
            Upload Signature
          </button>
        </div>
        {selectCourseIsOpen && (
          <UploadSignaturePage onCancel={closeSelectCourse} />
        )}
        {selectCourseIsOpen && <Backdrop />}
      </div>
    );
  } else if (user.userType == 5) {
    return (
      <div>
        <NavigationBar />
        <div className={classes["pp-container"]}>
          <div className={classes["pp-img-container"]}>
            <img className={classes["pp-img"]} alt="" src={img} />
          </div>
          <div className={classes["pp-center"]}>
            <table className={classes["pp-table"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}>
                    {user.name + " " + user.surname}
                  </h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Bilkent ID:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  {user.incomingStudentData.studentId}
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>E-Mail:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>{user.email}</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Department:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>Computer Science</td>
              </tr>
            </table>
          </div>
          <div className={classes["pp-center"]}>
            <table className={classes["pp-table"]}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}> </h1>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}> </h1>
                </td>
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Study Cycle:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>Bachelor's</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>
                  Sending Institution:
                </td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  {user.incomingStudentData.sendingInstitution}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavigationBar />
        <div className={classes["pp-container2"]}>
          <div className={classes["pp-img-container"]}>
            <img className={classes["pp-img"]} alt="" src={img} />
          </div>
          <div style={{marginLeft:-50}}>
            <table className={classes["pp-table2"]} style={{marginLeft:-200, marginTop:100}}>
              <tr>
                <td>
                  <h1 className={classes["pp-header-name"]}>
                    {user.name + " " + user.surname}
                  </h1>
                </td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>E-Mail:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>{user.email}</td>
              </tr>
              <tr>
                <br />
              </tr>
              <tr>
                <td className={classes["pp-header-other"]}>Role:</td>
              </tr>
              <tr>
                <td className={classes["pp-text-other"]}>
                  {user.userType === 1 ? "Erasmus Coordinator" : user.userType === 2 ? "Faculty Committee Member" : "Course Coordinator"}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePageOwn;
