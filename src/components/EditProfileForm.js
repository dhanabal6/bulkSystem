import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { RaisedButton } from 'material-ui';

import forms from "./forms";
import Joi from 'joi';
import createValidator from '../logic/joiReduxForm';
import { validate } from "../logic/register";
import { editProfile } from "../routines";

  const schema = {
    name: Joi.string().min(2).max(30).required(),
    emailId: Joi.string().email().required(),
    password: Joi.string().required(),
    phonenumber: Joi.number().required(),
    email: Joi.boolean(),
    sms: Joi.boolean(),
    whatsapp: Joi.boolean()
  };

class EditProfileForm extends Component {
  profileFormSubmit = values => {
    const data = {
      name: values.name,
      emailId: values.emailId,
      password: values.password,
      phonenumber: values.phonenumber,
      email: values.email,
      sms: values.sms,
      whatsapp: values.whatsapp
    };
    console.log(data);
    const userId = this.props.match.params.userId;
    console.log(userId);
    this.props.editProfile({userId,data});
  };
  
  render() {
    console.log(this.props)
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="indexform">
        <div className="formwrapper">
          <div className="register">
            <div className="formHeader">
              <h3>Register</h3>
            </div>
            <form
              className="formBody"
              onSubmit={handleSubmit(this.profileFormSubmit.bind(this))}
            >
              <Field name="name" component={forms.Text} placeholder="Name" />
              <Field
                name="emailId"
                component={forms.Text}
                placeholder="Email"
              />
              <Field
                name="password"
                component={forms.Password}
                placeholder="Password"
              />
              <Field name="phonenumber" component={forms.Text} placeholder="Phone Number" />
               <Field
                name="email"
                component={forms.Checkbox}
                label="Email"
              />
               <Field
                name="sms"
                component={forms.Checkbox}
                label="SMS"
              /> 
              <Field
                name="whatsapp"
                component={forms.Checkbox}
                label="WhatsApp Message"
              />
              <RaisedButton
                type="submit"
                label="Register"
                disabled={pristine || submitting}
                primary={true}
                fullWidth={true}
              />            
              </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfileForm = reduxForm({
  form: "register",
  validate,
  validate: createValidator(schema)
})(EditProfileForm);

export default withRouter(
  connect((state, props) => {
    const userData = state.user.data;
    return {
      initialValues: {
        name: userData.name,
        emailId: userData.emailId,
        password: userData.password,
        phonenumber: userData.phonenumber,
        email: userData.email,
        sms: userData.sms,
        whatsapp: userData.whatsapp
      }
  }
}, { editProfile })(EditProfileForm)
);
