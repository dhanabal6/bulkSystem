import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { Link, withRouter } from "react-router-dom";
import {
  FormControl,
  FormGroup,
  InputGroup,
  ControlLabel,
  Button
} from "react-bootstrap";
import readXlsxFile from "read-excel-file";

import forms from "./forms";
import { validate } from "../logic/message";
import { sendMail } from "../routines";

class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fileName: ""
    };
  }

  mailFormSubmit = e => {
    e.preventDefault();
    let mailId = document.getElementById("formMailText").value;
    let password = document.getElementById("formPasswordText").value;
    let email = document.getElementById("formEmailText").value;
    let subject = document.getElementById("formSubjectText").value;
    let message = document.getElementById("formControlsTextarea").value;
    let file = document.getElementById("formControlsFiles").files[0];
    const formData = new FormData();
    formData.append("mailId", mailId);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("file", file);
    console.log(mailId);
    console.log(password);
    this.props.sendMail(formData);
    this.refs.mailForm.reset();
    this.setState({email: '' });
    this.setState({fileName:''});
  };

  onFileChange = () => {
    let fileName = document.getElementById("formControlsFiles").files[0];
    this.setState({fileName:fileName.name});
  };

  onexcelFileChange = () => {
    let excelFileName = document.getElementById("formControlsFile").files[0];
    readXlsxFile(excelFileName).then(data => {
      const mailIds = data.toString();
      this.setState({ email: mailIds });
    });
  };

  render() {
    const location = this.props.location.pathname;
    const currentUrl = location.split("/");
    const emailUrl = currentUrl[1];
    console.log(this.state.email);
    return (
      <div className="container">
        <div className="headingTop">
          <h3>Email BULK SMS</h3>
        </div>
        <div className="formSection">
          <div className="sideButton col-md-4">
            <div>
              <div className="whatsappBtn">
                <i className="fa fa-whatsapp" />
              </div>
            </div>
            <div>
              <Link to="/sendemail" active>
                <div
                  className={
                    emailUrl == "sendemail" ? "mailBtn emailEnable" : "mailBtn"
                  }
                >
                  <i className="fa fa-envelope" />
                </div>
              </Link>
            </div>
            <div>
              <div className="smsBtn">
                <i className="fa fa-commenting-o" />
              </div>
            </div>
          </div>
          <div className="formContainer col-md-8">
            <form ref="mailForm" onSubmit={this.mailFormSubmit}>
              <FormGroup controlId="formMailText">
                <InputGroup>
                  <InputGroup.Addon className="emailAddon">
                    <i className="fa fa-user" />
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    className="EmailSec"
                    name="mail"
                    ref="mail"
                    placeholder="Your Bussiness Mail"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup controlId="formPasswordText">
                <InputGroup>
                  <InputGroup.Addon className="passwordAddon">
                    <i className="fa fa-user" />
                  </InputGroup.Addon>
                  <FormControl
                    type="password"
                    className="passwordSec"
                    name="password"
                    ref="password"
                    placeholder="Password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup controlId="formEmailText">
                <InputGroup>
                  <InputGroup.Addon className="importExcel">
                    <FormGroup
                      controlId="formControlsFile"
                      className="excelFiles"
                    >
                      <ControlLabel className="excelfileUpload">
                        <i className="fa fa-send-o" />
                        <span>Import Excel</span>
                      </ControlLabel>
                      <FormControl
                        type="file"
                        name="excelfile"
                        ref="excelfile"
                        onChange={this.onexcelFileChange}
                      />
                    </FormGroup>
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    className="mailSec"
                    ref="email"
                    value={this.state.email}
                    name="email"
                    placeholder="Import Your Mailid"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup controlId="formSubjectText">
                <FormControl
                  type="text"
                  className="subjectSec"
                  name="subject"
                  ref="subject"
                  placeholder="Subject"
                />
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <FormControl
                  componentClass="textarea"
                  name="message"
                  className="msgSec"
                  ref="message"
                  placeholder="Message"
                />
              </FormGroup>

              <FormGroup controlId="formFilesText">
                <InputGroup>
                  <InputGroup.Addon className="importFiles">
                    <FormGroup controlId="formControlsFiles" className="files">
                      <ControlLabel className="fileUpload">
                        <i className="fa fa-file" />
                        <span>Select Files</span>
                      </ControlLabel>
                      <FormControl
                        type="file"
                        name="file"
                        ref="file"
                        onChange={this.onFileChange}
                      />
                    </FormGroup>
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    className="fileSec"
                    ref="uploadFilename"
                    value={this.state.fileName}
                    name="files"
                    placeholder="Drop Your Attachments"
                  />
                </InputGroup>
              </FormGroup>
              <Button type="submit" className="sendButton">
                <i className="fa fa-envelope" /> SEND MAIL
              </Button>
              {this.props.isloading && (
                <span className="valid-green"> Sending... </span>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state, props) => ({
      isloading: state.mail.loading,
      initialValues: state.mail.data.find(
        message => message._id === props.match.params._id
      )
    }),
    { sendMail }
  )(MailForm)
);
