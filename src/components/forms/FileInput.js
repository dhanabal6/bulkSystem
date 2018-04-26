import React, {Component} from 'react';

const FileInput = ({ input, type, meta: { touched, error, warning } }) => {
  delete input.value

  return (
    <div>
      <label htmlFor={input.name}>
        Attach File
        <input {...input} type={type}/>
      </label>
    </div>
  )
}

export default FileInput;

/*
export default class FileInput  extends Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render(){
    const { input: { value } } = this.props
    const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
    return(
     <div><label>{label}</label>
     <div>
       <input
        type='file'
        accept='.jpg, .png, .jpeg,.doc'
        onChange={this.onChange}
       />
     </div>
     </div>
    )
}
}*/

/*const FileInput = ({ input, resetKey }) => {
  const { value, ...inputProps } = input;

  const handleChange = e => {
    input.onChange(e.target.files[0]);
  };

  return (
    <input
      {...inputProps}
      key={resetKey}
      type="file"
      onChange={handleChange}
      onBlur={() => {}}
    />
  );
};

export default FileInput;
*/