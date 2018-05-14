import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import LogIn from "../components/Login";
import Register from "../components/Register";

class HomePage extends Component {
  constructor(props) {
    super(props);
    const location = this.props.location.pathname;
    const currentUrl = location.split("/");
    const res = currentUrl[1];
    this.state = {
      currentView: res === "resetPassword" ? "" : "login"
    };
  }

  changeForm = name => {
    this.setState({ currentView: name });
  };
  render() {
    const { currentView } = this.state;
    return (
      <div className="homePage">
        {currentView === "login" && (
          <LogIn onSubmit={this.loginFormSubmit} changeForm={this.changeForm} />
        )}
        {currentView === "register" && (
          <Register onSubmit={this.registerFormSubmit} />
        )}
       
      </div>
    );
  }
}

export default withRouter(HomePage);
