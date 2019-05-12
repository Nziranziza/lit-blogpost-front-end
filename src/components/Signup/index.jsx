import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { handleSignupInput, register, inputValidation } from './../../redux/actions/signupAction';

export class Signup extends Component {
  signUp = (e) => {
    const {  
      firstName, 
      lastName, 
      email, 
      password,
      onSignup,
      verifyInput,
      history,
     } = this.props;
     verifyInput(firstName, lastName, email, password).then((res) => {
       if ( res === 'validationSuccess'){
      onSignup(firstName, lastName, email, password).then(res => {
        res.status === 201 && history.push('/');
      });
       }
     });
     e.preventDefault();
  }

  onChange = (e) => {
    const { onSignupInput } = this.props;
    onSignupInput(e.target);
  }

  renderError = () => {
    const { message } = this.props;
    if (message.length)
    {
      return <span className="alert alert-danger" data-test="error-field">{message}</span>
    }
  }

  render() {
    return (
      <div className="middle-content">
        <form className="text-center auth-form">
          <div className="md-form">
            <h5>SIGN UP</h5>
          </div>
          <div className="md-form">
          {this.renderError()}
          </div>
          <div className="md-form">
            <input 
            name="firstName" 
            className="form-control" 
            placeholder="First Name" 
            onChange={this.onChange}
            />
          </div>
          <div className="md-form">
            <input 
            name="lastName" 
            className="form-control" 
            placeholder="Last Name" 
            onChange={this.onChange}
            />
          </div>
          <div className="md-form">
            <input 
            name="email"  
            type="email" 
            className="form-control" 
            placeholder="Email" 
            placeholder="Email"
            onChange={this.onChange}
            />
          </div>
          <div className="md-form">
            <input 
            name="password"  
            className="form-control" 
            placeholder="Password"
            onChange={this.onChange}
            />
          </div>
          <button 
          className="btn btn-outline-primary btn-rounded btn-block my-4 waves-effect z-depth-0" 
          type="submit"
          onClick={this.signUp}
          >Sign up</button>
          <p>
         Already a member?
            <a href="#/login">Login</a>
          </p>
        </form>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  onSignupInput: ({name, value}) => dispatch(handleSignupInput({name, value})),
  onSignup:(firstName, lastName, email, password) => dispatch(register(firstName, lastName, email, password)),
  verifyInput: (firstName, lastName, email, password) => dispatch(inputValidation(firstName, lastName, email, password)),
})

export const mapStateToProps = ({
  signup: {
    credentials: {
      firstName,
      lastName,
      email,
      password,
    },
    message,
  }
}) => ({
  firstName,
  lastName,
  email,
  password,
  message,
});

Signup.propTypes = {
  message: PropTypes.string,
  onSignupInput: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
  verifyInput: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  message: PropTypes.string,
  history: PropTypes.any,
};

Signup.defaultProps = {
  message: '',
  firstName: '',
  lastName: '',
  password: '',
  message: '',
  history: {},
};
export default connect(mapStateToProps,mapDispatchToProps)(Signup);
