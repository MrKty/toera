import React from "react";
import validate from "validator/validator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MenuItem } from "@mui/material";
import Grid from "@material-ui/core/Grid";
import { handleRequests } from "../../../../../pages/requests";

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];
export default class App extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.options = countryList().getData();
    this.genderOptions = genderOptions;
    let date = new Date("1/1/2001");
    if (props.fields.dateOfBirth) {
      const time = props.fields.dateOfBirth.split("/");
      date = new Date(time[0], time[1], time[2]);
    }
    this.state = {
      options: this.options,
      genderOptions: this.genderOptions,
      complete: "",
      displayComplete: "none",
      dateOfBirth: date,
      nationality: props.fields.nationality
        ? {
            value: countryList().getValue(props.fields.nationality),
            label: props.fields.nationality,
          }
        : { value: "TR", label: "Turkey" },
      gender: props.fields.gender
        ? {
            value: props.fields.gender,
            label:
              props.fields.gender.charAt(0).toUpperCase() +
              props.fields.gender.substring(1, props.fields.gender.length),
          }
        : { value: "male", label: "Male" },
      name: props.fields.name,
      lastName: props.fields.lastName,
      academicYear: props.fields.academicYear,
      studyCycle: props.fields.studyCycle,
      subjectAreaCode: props.fields.subjectAreaCode,
      id: props.id,
      disabledName: true,
      disabledLastName: true,
      disabledDateOfBirth: true,
      disabledNationality: true,
      disabledGender: true,
      disabledAcademicYear: true,
      disabledStudyCycle: true,
      disabledSubjectArea: true,
    };

    this.updateInputName = this.updateInputName.bind(this);
    this.updateInputLastName = this.updateInputLastName.bind(this);

    this.updateInputAcademicYear = this.updateInputAcademicYear.bind(this);
    this.updateInputStudyCycle = this.updateInputStudyCycle.bind(this);
    this.updateInputSubjectAreaCode =
      this.updateInputSubjectAreaCode.bind(this);

    this.updateInputGender = this.updateInputGender.bind(this);
    this.updateInputNationality = this.updateInputNationality.bind(this);

    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  updateInputName(event) {
    this.setState({ name: event.target.value });
  }

  updateInputLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  updateInputAcademicYear(event) {
    this.setState({ academicYear: event.target.value });
  }

  updateInputStudyCycle(event) {
    this.setState({ studyCycle: event.target.value });
  }

  updateInputSubjectAreaCode(event) {
    this.setState({ subjectAreaCode: event.target.value });
  }

  updateInputGender(event) {
    this.setState({ gender: event.target.value });
  }

  updateInputNationality(event) {
    this.setState({ nationality: event.target.value });
  }

  handleChangeGender = (gender) => {
    this.setState({ gender });
  };
  changeHandler = (nationality) => {
    this.setState({ nationality });
    console.log(nationality);
  };

  handleChangeDate = (dateOfBirth) => {
    this.setState({ dateOfBirth });
  };

  handleEditNameClick() {
    this.setState({ disabledName: !this.state.disabledName });
  }

  handleEditLastNameClick() {
    this.setState({ disabledLastName: !this.state.disabledLastName });
  }

  handleEditDateOfBirthClick() {
    this.setState({ disabledDateOfBirth: !this.state.disabledDateOfBirth });
  }

  handleEditNationalityClick() {
    this.setState({ disabledNationality: !this.state.disabledNationality });
  }

  handleEditGenderClick() {
    this.setState({ disabledGender: !this.state.disabledGender });
  }

  handleEditAcademicYearClick() {
    this.setState({ disabledAcademicYear: !this.state.disabledAcademicYear });
  }

  handleEditStudyCycleClick() {
    this.setState({ disabledStudyCycle: !this.state.disabledStudyCycle });
  }

  handleSubjectAreaClick() {
    this.setState({ disabledSubjectArea: !this.state.disabledSubjectArea });
  }

  handlerComplete = (e) => {
    const date = new Date(this.state.dateOfBirth);
    const studentInfo = {
      id: this.state.id,
      infoType: 0,
      name: this.state.name,
      lastName: this.state.lastName,
      academicYear: this.state.academicYear,
      studyCycle: this.state.studyCycle,
      subjectAreaCode: this.state.subjectAreaCode,
      gender: this.state.gender.value,
      dateOfBirth: date
        ? date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
        : "",
      nationality: this.state.nationality.label,
    };

    handleRequests(
      e,
      studentInfo,
      "learning-agreement-1-3",
      "2",
      (response, status) => {
        if (response.status === 200) {
          this.savedInfo = (
            <div>
              <p>Fields are saved!</p>
            </div>
          );
        }
      }
    );
  };

  render() {
    return (
      <div className={"App"}>
        <div>
          <div id="survey-form">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label className={"textHeader"} id="name-label" htmlFor="name">
                  Name
                </label>
              </Grid>

              <Grid item xs={6}>
                <div id="nameCircle" ref={(div) => (this.nameCircle = div)} />
                <input
                  ref={"this.nameRef"}
                  id="name"
                  maxLength="30"
                  placeholder="write your name"
                  pattern="[A-Za-z]"
                  className="styleInput"
                  defaultValue={this.state.name}
                  onChange={this.updateInputName}
                  disabled={this.state.disabledName ? "disabledName" : ""}
                  required
                />
              </Grid>

              <Grid item xs={1}></Grid>

              <Grid item xs={4}>
                <label
                  className={"textHeader"}
                  id="lastName-label"
                  htmlFor="Last name"
                >
                  Last Name
                </label>
              </Grid>

              <div />

              <Grid item xs={6}>
                <input
                  ref={"this.lastnameRef"}
                  id="lastName"
                  maxLength="30"
                  pattern="[A-Za-z]"
                  defaultValue={this.state.lastName}
                  onChange={this.updateInputLastName}
                  className="styleInput"
                  disabled={
                    this.state.disabledLastName ? "disabledLastName" : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton"
                  onClick={this.handleEditLastNameClick.bind(this)}
                  disabled={!this.state.disabledLastName}
                >
                  {" "}
                  Edit
                </button>
              </Grid>

              <Grid item xs={4}>
                <label
                  className={"textHeader"}
                  id="Dateofbirth-label"
                  htmlFor="Date of Birth"
                >
                  Date of Birth
                </label>
              </Grid>

              <Grid item xs={6}>
                <DatePicker
                  ref={"this.dateOfBirthRef"}
                  selected={this.state.dateOfBirth}
                  onChange={this.handleChangeDate}
                  className="styleInput"
                  disabled={
                    this.state.disabledDateOfBirth ? "disabledDateOfBirth" : ""
                  }
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton"
                  onClick={this.handleEditDateOfBirthClick.bind(this)}
                  disabled={!this.state.disabledDateOfBirth}
                >
                  {" "}
                  Edit
                </button>
              </Grid>

              <Grid item xs={4}>
                <label
                  className={"textHeader"}
                  id="lastName-label"
                  htmlFor="country"
                >
                  Nationality
                </label>
              </Grid>

              <Grid item xs={6}>
                <div
                  id="countryFlag"
                  className="marginBottom"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <ReactCountryFlag
                    countryCode={
                      this.state.nationality ? this.state.nationality.value : ""
                    }
                    svg
                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                    cdnSuffix="svg"
                    title={
                      this.state.nationality ? this.state.nationality.value : ""
                    }
                  />
                  <div
                    style={{
                      marginLeft: "10px",
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <Select
                      ref={"this.nationalityRef"}
                      isSearchable={true}
                      options={this.state.options}
                      defaultValue={this.state.nationality}
                      disabled={
                        this.state.disabledNationality
                          ? "disabledNationality"
                          : ""
                      }
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditNationalityClick.bind(this)}
                  disabled={!this.state.disabledNationality}
                >
                  {" "}
                  Edit
                </button>
              </Grid>

              <Grid item xs={4}>
                <label
                  className={"textHeader"}
                  id="lastName-label"
                  htmlFor="country"
                >
                  Gender
                </label>
              </Grid>

              <Grid item xs={6}>
                <div
                  style={{ marginLeft: "0px", color: "black", width: "50%" }}
                >
                  <Select
                    options={this.state.genderOptions}
                    value={this.state.gender}
                    onChange={this.handleChangeGender}
                    disabled={this.state.disabledGender ? "disabledGender" : ""}
                  >
                    {this.genderOptions.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditGenderClick.bind(this)}
                  disabled={!this.state.disabledGender}
                >
                  {" "}
                  Edit
                </button>
              </Grid>

              <Grid item xs={4}>
                <label className={"textHeader"} id="name-label" htmlFor="name">
                  Academic Year
                </label>
              </Grid>

              <Grid item xs={6}>
                <input
                  ref={"this.academicYear"}
                  id="name"
                  maxLength="30"
                  className="styleInput"
                  defaultValue={this.state.academicYear}
                  onChange={this.updateInputAcademicYear}
                  disabled={
                    this.state.disabledAcademicYear
                      ? "disabledAcademicYear"
                      : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditAcademicYearClick.bind(this)}
                  disabled={!this.state.disabledAcademicYear}
                >
                  {" "}
                  Edit
                </button>
              </Grid>

              <Grid item xs={4}>
                <label
                  className={"textHeader"}
                  id="lastName-label"
                  htmlFor="Address"
                >
                  Study Cycle
                </label>
              </Grid>

              <Grid item xs={6}>
                <input
                  ref={"this.studyCycle"}
                  id="studyCycle"
                  maxLength="50"
                  defaultValue={this.state.studyCycle}
                  onChange={this.updateInputStudyCycle}
                  className="styleInput"
                  disabled={
                    this.state.disabledStudyCycle ? "disabledStudyCycle" : ""
                  }
                  required
                />
              </Grid>
              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleEditStudyCycleClick.bind(this)}
                  disabled={!this.state.disabledStudyCycle}
                >
                  {" "}
                  Edit
                </button>
              </Grid>

              <Grid item xs={4}>
                <label
                  className={"textHeader"}
                  id="lastName-label"
                  htmlFor="Address"
                >
                  Subject Area Code
                </label>
              </Grid>
              <Grid item xs={6}>
                <input
                  id="subjectAreaCode"
                  className="styleInput"
                  defaultValue={this.state.subjectAreaCode}
                  onChange={this.updateInputSubjectAreaCode}
                  disabled={
                    this.state.disabledSubjectArea ? "disabledSubjectArea" : ""
                  }
                  required
                />
              </Grid>

              <Grid item xs={1}>
                <button
                  className="editButton "
                  onClick={this.handleSubjectAreaClick.bind(this)}
                  disabled={!this.state.disabledSubjectArea}
                >
                  {" "}
                  Edit
                </button>
              </Grid>
            </Grid>
            <div className="perfectCentered">
              <button className="buttons" onClick={this.handlerComplete}>
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
