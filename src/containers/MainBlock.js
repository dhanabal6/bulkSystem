import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link, Route, withRouter } from "react-router-dom";

import { userInfo } from "../routines";
import MailForm from "../components/MailForm";
import WhatsAppForm from "../components/WhatsAppForm";
import SmsForm from "../components/SmsForm";

class MainBlock extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.userInfo();
  }

  render() {
    const email = this.props.isEmail;
    const sms = this.props.isSms;
    const whatsapp = this.props.isWhatsapp;
    if (email == true && sms == undefined && whatsapp == undefined) {
      return (
        <div className="container">
          <MailForm mailFormSubmit={this.mailFormSubmit} />
        </div>
      );
    }
    if (email == undefined && sms == true && whatsapp == undefined) {
      return (
        <div className="container">
          <SmsForm smsFormSubmit={this.smsFormSubmit} />
        </div>
      );
    }
    if (email == undefined && sms == undefined && whatsapp == true) {
      return (
        <div className="container">
          <WhatsAppForm whatsappFormSubmit={this.whatsappFormSubmit} />
        </div>
      );
    }
    if (email == true && sms == true && whatsapp == undefined) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>CHOOSE YOUR BULK MESSAGE SERVICE</h3>
          </div>
          <div className="section-sides">
            <div>
              <Link to="/sendemail">
                <div className="mailBtn">
                  <i className="fa fa-envelope" />
                </div>
              </Link>
              <div className="mailCtn">BULK EMAIL</div>
            </div>
            <div>
              <Link to="/sendsms">
                <div className="smsBtn">
                  <i className="fa fa-commenting-o" />
                </div>
              </Link>
              <div className="smsCtn">TEXT MESSAGE</div>
            </div>
          </div>
            <Route
              path="/sendemail"
              render={() => <MailForm mailFormSubmit={this.mailFormSubmit} />}
            />
            <Route
              path="/sendsms"
              render={() => <SmsForm smsFormSubmit={this.smsFormSubmit} />}
            />
        </div>
      );
    }
    if (email == true && sms == undefined && whatsapp == true) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>CHOOSE YOUR BULK MESSAGE SERVICE</h3>
          </div>
          <div className="section-sides">
            <div>
              <Link to="/sendwhatsapp">
                <div className="whatsappBtn">
                  <i className="fa fa-whatsapp" />
                </div>
              </Link>
              <div className="whatsappCtn">WHATAPP MESSAGE</div>
            </div>
            <div>
              <Link to="/sendemail">
                <div className="mailBtn">
                  <i className="fa fa-envelope" />
                </div>
              </Link>
              <div className="mailCtn">BULK EMAIL</div>
            </div>
            <Route
              path="/sendemail"
              render={() => <MailForm mailFormSubmit={this.mailFormSubmit} />}
            />
            <Route
              path="/sendwhatsapp"
              render={() => (
                <WhatsAppForm whatsappFormSubmit={this.whatsappFormSubmit} />
              )}
            />
          </div>
        </div>
      );
    }
    if (email == undefined && sms == true && whatsapp == true) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>CHOOSE YOUR BULK MESSAGE SERVICE</h3>
          </div>
          <div className="section-sides">
            <div>
              <Link to="/sendwhatsapp">
                <div className="whatsappBtn">
                  <i className="fa fa-whatsapp" />
                </div>
              </Link>
              <div className="whatsappCtn">WHATAPP MESSAGE</div>
            </div>
            <div>
              <Link to="/sendsms">
                <div className="smsBtn">
                  <i className="fa fa-commenting-o" />
                </div>
              </Link>
              <div className="smsCtn">TEXT MESSAGE</div>
            </div>
            <Route
              path="/sendwhatsapp"
              render={() => (
                <WhatsAppForm whatsappFormSubmit={this.whatsappFormSubmit} />
              )}
            />
            <Route
              path="/sendsms"
              render={() => <SmsForm smsFormSubmit={this.smsFormSubmit} />}
            />
          </div>
        </div>
      );
    }
    if (email == true && sms == true && whatsapp == true) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>CHOOSE YOUR BULK MESSAGE SERVICE</h3>
          </div>
          <div className="section-sides">
            <div>
              <Link to="/sendwhatsapp">
                <div className="whatsappBtn">
                  <i className="fa fa-whatsapp" />
                </div>
              </Link>
              <div className="whatsappCtn">WHATAPP MESSAGE</div>
            </div>
            <div>
              <Link to="/sendemail">
                <div className="mailBtn">
                  <i className="fa fa-envelope" />
                </div>
              </Link>
              <div className="mailCtn">BULK EMAIL</div>
            </div>
            <div>
              <Link to="/sendsms">
                <div className="smsBtn">
                  <i className="fa fa-commenting-o" />
                </div>
              </Link>
              <div className="smsCtn">TEXT MESSAGE</div>
            </div>
            <Route
              path="/sendemail"
              render={() => <MailForm mailFormSubmit={this.mailFormSubmit} />}
            />
            <Route
              path="/sendwhatsapp"
              render={() => (
                <WhatsAppForm whatsappFormSubmit={this.whatsappFormSubmit} />
              )}
            />
            <Route
              path="/sendsms"
              render={() => <SmsForm smsFormSubmit={this.smsFormSubmit} />}
            />
          </div>
        </div>
      );
    }
    if (email == undefined && sms == undefined && whatsapp == undefined) {
      return (
        <div className="container">
          <div className="headingTop">
            <h3>NO SERVICE YOUR CHOOSEN</h3>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(
  connect(
    (state, props) => ({
      isEmail: state.user.data.email,
      isSms: state.user.data.sms,
      isWhatsapp: state.user.data.whatsapp
    }),
    { userInfo }
  )(MainBlock)
);
