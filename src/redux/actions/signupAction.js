import validator from 'email-validator';
import {
  HANDLE_SIGNUP_INPUT,
  SUBMIT_SIGNUP_FORM,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  CLEAR_SIGNUP,
} from '../action-types';
import axios from '../../helpers/axios';
import setCurrentUser from './currentUserAction';

export const handleSignupInput = payload => ({
  type: HANDLE_SIGNUP_INPUT,
  payload,
});

export const submitSignupForm = () => ({
  type: SUBMIT_SIGNUP_FORM,
});

export const signupFailure = payload => ({
  type: SIGNUP_FAILURE,
  payload,
});

export const signupSuccess = payload => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const clearSignupForm = () => ({
  type: CLEAR_SIGNUP,
});

export const inputValidationFailure = payload => ({
  type: INPUT_VALIDATION_FAILURE,
  payload,
});

export const inputValidationSuccess = payload => ({
  type: INPUT_VALIDATION_SUCCESS,
  payload,
});

export const register = (
  firstName,
  lastName,
  email,
  password,
) => dispatch => new Promise((resolve) => {
  dispatch(submitSignupForm());
  axios.post('/auth/signup', {
    firstName,
    lastName,
    email,
    password,
  }).then(({ data }) => {
    dispatch(signupSuccess(data));
    dispatch(clearSignupForm());
    dispatch(setCurrentUser(data));
    return resolve(data);
  }).catch(({ response: { data } }) => {
    dispatch(signupFailure(data));
    return resolve(data);
  });
});

export const inputValidation = (email,
  password,
  firstName,
  lastName) => dispatch => new Promise((resolve) => {
  if (!email.length || !password.length || !firstName.length || !lastName.length) {
    dispatch(inputValidationFailure('All fields are required'));
    return resolve('validationFailure');
  }
  if (!validator.validate(email)) {
    dispatch(inputValidationFailure('Invalid Email'));
    return resolve('validationFailure');
  }
  if (password.length !== 6) {
    dispatch(inputValidationFailure('Password must be 6 characters'));
    return resolve('validationFailure');
  }
  dispatch(inputValidationSuccess());
  return resolve('validationSuccess');
});
