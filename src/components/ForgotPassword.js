import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { RaisedButton,Dialog } from 'material-ui';
import forms from './forms';
import { validate } from '../logic/login';
import { forgotPassword } from '../routines';

class ForgotPasswordForm extends Component {
  forgotPasswordFormSubmit = values => {
    const data = {
      emailId: values.emailId
    };
    this.props.forgotPassword(data);
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
          <div className="forgotForm">
            <div className="formHeader">
              <h3>Forgot Password</h3>
            </div>
            <form
              className="formBody"
              onSubmit={handleSubmit(this.forgotPasswordFormSubmit.bind(this))}
            >
              <Field name="emailId" component={forms.Text} label="Email" />
              <RaisedButton
                type="submit"
                label="Reset Password"
                disabled={pristine || submitting}
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

ForgotPasswordForm = reduxForm({
  form: "forgot",
  validate
})(ForgotPasswordForm);

export default withRouter(
  connect((state, props) => {}, { forgotPassword })(ForgotPasswordForm)
);
