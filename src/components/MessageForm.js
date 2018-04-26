import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { RaisedButton, Dialog } from "material-ui";
import FileUpload from 'material-ui/svg-icons/file/attachment';

import forms from "./forms";
import { validate } from "../logic/message";
import { sendMessage } from "../routines";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: []
    };
  }

  messageFormSubmit = values => {
    console.log(values)
    console.log(values.file[0]);

  if (values instanceof FileList) {
    console.log(FileList);
    return Array.from(values).map(file => file.name).join(', ') || 'No Files Selected';
  }
    // let formData = new formData()
    //     formData.append('FileList', values.file[0])
    //     console.log(formData);

    const data = {
      email: values.email,
      message: values.message,
    };
    console.log(data);

    // this.props.sendMessage(values);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    if (this.props.isPopup) {
      this.props.history.push("/");
    }
    return (
        <form onSubmit={handleSubmit(this.messageFormSubmit.bind(this))}>
          <div className="mainform">
            <Field name="email" component={forms.Text} label="Email" />
            <Field
              name="message"
              component={forms.TextArea}
              label="Message"
            />
            <Field
             name="file"
             type="file"
             component={forms.FileInput}
            />
             <FileUpload  />
          </div>
          <RaisedButton
            type="submit"
            label="Send"
            disabled={pristine || submitting}
            primary={true}
            className="button"
          />
          <RaisedButton
            type="reset"
            label="ReSet"
            secondary={true}
            className="button"
            disabled={pristine || submitting}
            onClick={reset}
          />
         {this.props.isloading && (
            <span className="valid-green"> Sending... </span>
          )}
        </form>
    );
  }
}

MessageForm = reduxForm({
  form: "mail",
  validate
})(MessageForm);

export default withRouter(
  connect(
    (state, props) => ({
      isloading: state.message.loading,
      initialValues: state.message.data.find(
        message => message._id === props.match.params._id
      )
    }),
    { sendMessage  }
  )(MessageForm)
);
