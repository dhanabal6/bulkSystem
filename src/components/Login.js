import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { RaisedButton, Dialog } from "material-ui";

import forms from "./forms";
import { validate } from "../logic/login";
import { login } from "../routines";

class LoginForm extends Component {
  loginFormSubmit = (values) => {
    const data = {
      emailId: values.emailId,
      password: values.password
    };
    if (values.checker == true) {
      localStorage.setItem("rememberMe", JSON.stringify(data));
    }
    this.props.login(data);
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
       <Dialog
        title={
          <div className="popheader">
            <span
              className="close"
              onClick={this.props.handleClose}
            >
              X
            </span>
          </div>
        }
        modal={false}
        open={true}
      >
      <div className="indexform">
        <div className="formwrapper">
          <div className="loginForm">
            <div className="formHeader">
              <h3>Log In</h3>
            </div>
            <form
              className="formBody"
              name="form"
              onSubmit={handleSubmit(this.loginFormSubmit.bind(this))}
            >
              <Field
                name="emailId"
                component={forms.Text}
                placeholder="EmailId"
              />
              <Field
                name="password"
                type="password"
                component={forms.Password}
                placeholder="Password"
              />
              <Field
                name="checker"
                component={forms.Checkbox}
                label="Keep Me Login"
              />
              <RaisedButton
                type="submit"
                label="Login"
                primary={true}
                fullWidth={true}
              />
            </form>
          </div>
        </div>
      </div>
      </Dialog>
    );
  }
}

LoginForm = reduxForm({
  form: "login",
  validate
})(LoginForm);

export default withRouter(
  connect(
    (state, props) => {
      const obj = JSON.parse(localStorage.getItem("rememberMe")) || {};
      return {
        isloading: state.user.loading,
        initialValues: {
          emailId: obj.emailId,
          password: obj.password
        }
      };
    },
    { login }
  )(LoginForm)
);
