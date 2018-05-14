import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton,Dialog } from 'material-ui';

import forms from './forms';
import { validate } from '../logic/login';
import { resetPassword } from '../routines';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    const token = this.props.match.params.token;
  }

  resetPasswordFormSubmit = values => {
    const data = {
      password: values.password
    };
    const token = this.props.match.params.token;
    this.props.resetPassword({ token, data });
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
          <div className="resetForm">
            <div className="formHeader">
              <h3>Reset Password</h3>
            </div>
            <form
              className="formBody"
              onSubmit={handleSubmit(this.resetPasswordFormSubmit.bind(this))}
            >
              <Field
                name="password"
                component={forms.Password}
                label="New Password"
              />
              <RaisedButton
                type="submit"
                label="Update Password"
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

ResetPasswordForm = reduxForm({
  form: "reset",
  validate
})(ResetPasswordForm);

export default withRouter(
  connect((state, props) => ({}), { resetPassword })(ResetPasswordForm)
);
