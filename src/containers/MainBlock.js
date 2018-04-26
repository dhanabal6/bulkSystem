import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link, Route, withRouter } from "react-router-dom";

import MailForm from "../components/MailForm";

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
       };
  }

  render() {
    return (
      <div className="container">
        <div className="headingTop">
          <h3>CHOOSE YOUR BULK MESSAGE SERVICE</h3>
         </div>
        <div className="section-sides">
        <div>
        <div className="whatsappBtn"><i className="fa fa-whatsapp"></i></div>
        <div className="whatsappCtn">WHATAPP MESSAGE</div>
        </div>
        <div>
        <Link to="/sendemail">
        <div className="mailBtn"><i className="fa fa-envelope"></i></div>
        </Link>
        <div className="mailCtn">BULK EMAIL</div>
        </div>
        <div>
        <div className="smsBtn">
        <i className="fa fa-commenting-o"></i></div>
        <div className="smsCtn">TEXT MESSAGE</div>
        </div>
          <Route
          path="/sendemail"
          render={() => (
          <MailForm mailFormSubmit={this.mailFormSubmit} />)}/>
      </div>
      </div>
    );
  }
}

export default withRouter(MainBlock);
