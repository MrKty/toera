import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import TableAddRows from "./TableAddRows";

function PreApprovalFormFacAdmin() {
  return (
    <div>
      <NavigationBar />
      <div className="pafp-container">
        <h1 className="pafp-h1">Applicant Info:</h1>
        <table className="pafp-first-table">
          <tr>
            <td className="pafp-first-table-td">
              <p className="pafp-table-title">Name:</p>
            </td>
            <td className="pafp-first-table-td">
              <p className="ap-text-other">Onurcan</p>
            </td>
          </tr>
          <tr>
            <td className="pafp-first-table-td">
              <p className="pafp-table-title">Surname:</p>
            </td>
            <td className="pafp-first-table-td">
              <p className="ap-text-other">Ataç</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">ID Number:</p>
            </td>
            <td>
              <p className="ap-text-other">28578758</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Department:</p>
            </td>
            <td>
              <p className="ap-text-other">Computer Science</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Host Institution Name:</p>
            </td>
            <td>
              <p className="ap-text-other">Kingston University</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="pafp-table-title">Academic Semester:</p>
            </td>
            <td>
              <p className="ap-text-other">3rd Year</p>
            </td>
            <td>
              <p className="ap-text-other">5th Semester</p>
            </td>
          </tr>
        </table>
        <div className="pafp-container2">
          <p className="pafp-alert">
            Host Institution Courses to be Transferred Upon Approval
          </p>
          <p className="pafp-alert">Course or Requirement to be Exempted</p>
        </div>
        <div className="pafp-flex-div">
          <TableAddRows />
        </div>

        <div>
          <table className="pafp-first-table">
            <tr>
              <td className="pafp-first-table-td">
                <p className="pafp-table-title">Total ECTS:</p>
              </td>
              <td className="pafp-first-table-td">
                <p className="ap-text-other">6</p>
              </td>
            </tr>
          </table>

          <table className="pafp-table-last">
            <tr>
              <td className="pafp-last-table-td">
                <button className="pafp-button">Convert to PDF</button>
              </td>
              <td className="pafp-last-table-td">
                <button className="pafp-button">Edit Form</button>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header">Approved By</p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header">Name</p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header">Signature</p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header">Date</p>
              </td>
            </tr>
            <tr>
              <td className="pafp-last-table-td">
                <button className="pafp-button-blue">Approve Form</button>
              </td>
              <td className="pafp-last-table-td">
                <button className="pafp-button-yellow">Reject Form</button>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-lined-header"></p>
              </td>
              <td className="pafp-last-table-td">
                <p className="pafp-red-text">Not Approved</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PreApprovalFormFacAdmin;
