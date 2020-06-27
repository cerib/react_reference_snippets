import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingStream: false,
    };
  }

  renderError(meta) {
    let { error, touched } = meta;
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = (formProps) => {
    const className = `field ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    if (this.state.creatingStream === false) {
      //this just makes the button aware that we are creating a stream and puts a spinner inside
      this.setState({
        creatingStream: true,
      });
    }
    this.props.onSubmit(formValues);
  };

  //almost works but prevents user from using any space at all in between words
  /*   trimSpaces = (text) => {
    return text.trim();
  }; */

  render() {
    const loading = this.state.creatingStream ? "loading" : " ";

    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error" //tirar error se nao quiser que aparecam as mensagens de erro (comportamento da semantic ui)
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Stream Title"
          //normalize={this.trimSpaces}
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Stream Description"
          //normalize={this.trimSpaces}
        />
        <button className={`ui ${loading} button primary`}>Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);

export default formWrapped;
