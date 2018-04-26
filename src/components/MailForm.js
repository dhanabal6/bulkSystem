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

import forms from "./forms";
import { validate } from "../logic/message";
import { sendMail } from "../routines";

class MailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  mailFormSubmit = e => {
    e.preventDefault();
    let email = document.getElementById("formEmailText").value;
    let subject = document.getElementById("formSubjectText").value;
    let message = document.getElementById("formControlsTextarea").value;
    let file = document.getElementById("formControlsFile").files[0];
    const formData = new FormData();
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("file", file);
    this.props.sendMail(formData);
    this.refs.mailForm.reset();
    this.refs.uploadFilename.innerHTML = "Choose Mail Attachments";
  };

  onFileChange = () => {
    let fileName = document.getElementById("formControlsFile").files[0];
    this.refs.uploadFilename.innerHTML = fileName.name;
  };

  render() {
    const location = this.props.location.pathname;
    const currentUrl = location.split("/");
    const emailUrl = currentUrl[1];
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
              <FormGroup controlId="formEmailText">
                <InputGroup>
                  <FormControl
                    type="text"
                    className="mailSec"
                    ref="email"
                    name="email"
                    placeholder="Mailid"
                  />
                  <InputGroup.Addon>
                    <i className="fa fa-send-o" />
                  </InputGroup.Addon>
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
              <FormGroup controlId="formControlsFile" className="fileSec">
                <ControlLabel className="fileUpload">
                  <i className="fa fa-file" />
                </ControlLabel>
                <FormControl
                  type="file"
                  name="file"
                  ref="file"
                  onChange={this.onFileChange}
                />
                <span className="uploadFilename" ref="uploadFilename">
                  Choose Mail Attachments
                </span>
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
