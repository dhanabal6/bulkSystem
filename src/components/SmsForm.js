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
import { validate } from "../logic/sms";
import { sendSms, userInfo } from "../routines";

class SmsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      fileName: ""
    };
  }

  componentWillMount() {
    this.props.userInfo();
  }

  smsFormSubmit = e => {
    e.preventDefault();
    let number = document.getElementById("formNumberText").value;
    let message = document.getElementById("formControlsTextarea").value;
    const data = {
      number: number,
      message: message
    };
    console.log(data);
    // let file = document.getElementById("formControlsFiles").files[0];
    // const formData = new FormData();
    // formData.append("number", number);
    // formData.append("message", message);
    // formData.append("file", file);
    // console.log(formData);
    this.props.sendSms(data);
    this.refs.smsForm.reset();
    this.setState({ number: "" });
    this.setState({ fileName: "" });
  };

  onFileChange = () => {
    let fileName = document.getElementById("formControlsFiles").files[0];
    this.setState({ fileName: fileName.name });
  };

  onexcelFileChange = () => {
    let excelFileName = document.getElementById("formControlsFile").files[0];
    readXlsxFile(excelFileName).then(data => {
      const numbers = data.toString();
      this.setState({ number: numbers });
    });
  };

  render() {
    const location = this.props.location.pathname;
    const currentUrl = location.split("/");
    const smsUrl = currentUrl[1];
    const email = this.props.isEmail;
    const sms = this.props.isSms;
    const whatsapp = this.props.isWhatsapp;
    if (email == undefined && sms == true && whatsapp == undefined) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>BULK SMS MESSAGES</h3>
          </div>
          <div className="formSection">
            <div className="sideButton col-md-4" />
            <div className="formContainer col-md-8">
              <form ref="smsForm" onSubmit={this.smsFormSubmit}>
                <FormGroup controlId="formNumberText">
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
                      ref="number"
                      value={this.state.number}
                      name="number"
                      placeholder="Import Your Numbers"
                    />
                  </InputGroup>
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
                      <FormGroup
                        controlId="formControlsFiles"
                        className="files"
                      >
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
                <Button type="submit" className="sendsmsButton">
                  <i className="fa fa-commenting-o" /> SEND MESSAGES
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

    if (email == true && sms == true && whatsapp == undefined) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>BULK SMS MESSAGES</h3>
          </div>
          <div className="formSection">
            <div className="sideButton col-md-4">
              <div>
                <Link to="/sendemail">
                  <div className="mailBtn">
                    <i className="fa fa-envelope" />
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/sendsms">
                  <div
                    className={
                      smsUrl == "sendsms" ? "smsBtn smsEnable" : "smsBtn"
                    }
                  >
                    <i className="fa fa-commenting-o" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="formContainer col-md-8">
              <form ref="smsForm" onSubmit={this.smsFormSubmit}>
                <FormGroup controlId="formNumberText">
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
                      ref="number"
                      value={this.state.number}
                      name="number"
                      placeholder="Import Your Numbers"
                    />
                  </InputGroup>
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
{/*
                <FormGroup controlId="formFilesText">
                  <InputGroup>
                    <InputGroup.Addon className="importFiles">
                      <FormGroup
                        controlId="formControlsFiles"
                        className="files"
                      >
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
*/}                <Button type="submit" className="sendsmsButton">
                  <i className="fa fa-commenting-o" /> SEND MESSAGES
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

    if (email == undefined && sms == true && whatsapp == true) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>BULK SMS MESSAGES</h3>
          </div>
          <div className="formSection">
            <div className="sideButton col-md-4">
              <div>
                <Link to="/sendwhatsapp">
                  <div className="whatsappBtn">
                    <i className="fa fa-whatsapp" />
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/sendsms">
                  <div
                    className={
                      smsUrl == "sendsms" ? "smsBtn smsEnable" : "smsBtn"
                    }
                  >
                    <i className="fa fa-commenting-o" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="formContainer col-md-8">
              <form ref="smsForm" onSubmit={this.smsFormSubmit}>
                <FormGroup controlId="formNumberText">
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
                      ref="number"
                      value={this.state.number}
                      name="number"
                      placeholder="Import Your Numbers"
                    />
                  </InputGroup>
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
                      <FormGroup
                        controlId="formControlsFiles"
                        className="files"
                      >
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
                <Button type="submit" className="sendsmsButton">
                  <i className="fa fa-commenting-o" /> SEND MESSAGES
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

    if (email == true && sms == true && whatsapp == true) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>BULK SMS MESSAGES</h3>
          </div>
          <div className="formSection">
            <div className="sideButton col-md-4">
              <div>
                <Link to="/sendwhatsapp">
                  <div className="whatsappBtn">
                    <i className="fa fa-whatsapp" />
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/sendemail">
                  <div className="mailBtn">
                    <i className="fa fa-envelope" />
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/sendsms">
                  <div
                    className={
                      smsUrl == "sendsms" ? "smsBtn smsEnable" : "smsBtn"
                    }
                  >
                    <i className="fa fa-commenting-o" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="formContainer col-md-8">
              <form ref="smsForm" onSubmit={this.smsFormSubmit}>
                <FormGroup controlId="formNumberText">
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
                      ref="number"
                      value={this.state.number}
                      name="number"
                      placeholder="Import Your Numbers"
                    />
                  </InputGroup>
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
                      <FormGroup
                        controlId="formControlsFiles"
                        className="files"
                      >
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
                <Button type="submit" className="sendsmsButton">
                  <i className="fa fa-commenting-o" /> SEND MESSAGES
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

   if (email == undefined && sms == undefined && whatsapp == undefined) {
      return (null);
    }
  }
}

export default withRouter(
  connect(
    (state, props) => ({
      isEmail: state.user.data.email,
      isSms: state.user.data.sms,
      isWhatsapp: state.user.data.whatsapp,
      isloading: state.sms.loading,
      initialValues: state.sms.data.find(
        sms => sms._id === props.match.params._id
      )
    }),
    { sendSms, userInfo }
  )(SmsForm)
);
