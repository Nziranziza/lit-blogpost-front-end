import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  handleLoginInput,
  login,
  inputValidation,
} from './../../redux/actions/loginActions';

class Login extends Component {
  onChange = (e) => {
    const { onLoginInput } = this.props;
    onLoginInput(e.target);
  }

  signIn = (e) => {
    e.preventDefault();
    const { 
      email,
      password,
      loginUser,
      history,
      verifyInput,
    } = this.props;
    verifyInput(email, password).then((res) => {
      if(res === 'validationSuccess'){
      loginUser(email, password).then((res) => {
        res.status === 200 && history.push('/');
      });
    }
    });
  }

  renderError = () => {
    const { message } = this.props;
    if (message.length)
    {
      return <span className="alert alert-danger">{message}</span>
    }
  }
  render() {
    return (
      <div className="middle-content">
        <form className="text-center auth-form">
          <div className="md-form">
            <h5>SIGN IN</h5>
          </div>
          <div className="md-form">
          {this.renderError()}
          </div>
          <div className="md-form">
            <input 
            type="email" 
            name="email" 
            className="form-control" 
            placeholder="Email" 
            onChange={this.onChange}
            />
          </div>
          <div className="md-form">
            <input 
            type="password" 
            name="password" 
            className="form-control" 
            placeholder="Password" 
            onChange={this.onChange}
            />
          </div>
          <button 
          className="btn btn-outline-primary btn-rounded btn-block my-4 waves-effect z-depth-0" 
          type="submit"
          onClick={this.signIn}
          >Sign in</button>
          <p>
          Not a member?
            <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    );
  }
};

export const mapDispatchToProps = (dispatch) => ({
  onLoginInput: ({ name, value }) => dispatch(handleLoginInput({ name, value })),
  loginUser: (username, password) => dispatch(login(username, password)),
  verifyInput: (email, password) => dispatch(inputValidation(email, password)),
});

export const mapStateToProps = ({
  login: {
    message,
    credentials: {
      email,
      password,
    }
  }
}) => ({
email,
password,
message,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
