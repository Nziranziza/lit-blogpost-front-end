import validator from 'email-validator';
import {
  HANDLE_LOGIN_INPUT,
  SUBMIT_LOGIN_FORM,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  CLEAR_LOGIN,
} from '../action-types';
import axios from '../../helpers/axios';
import setCurrentUser from './currentUserAction';

export const handleLoginInput = payload => ({
  type: HANDLE_LOGIN_INPUT,
  payload,
});

export const submitLoginForm = () => ({
  type: SUBMIT_LOGIN_FORM,
});

export const loginFailure = payload => ({
  type: LOGIN_FAILURE,
  payload,
});

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const clearLoginForm = () => ({
  type: CLEAR_LOGIN,
});

export const inputValidationFailure = payload => ({
  type: INPUT_VALIDATION_FAILURE,
  payload,
});

export const inputValidationSuccess = payload => ({
  type: INPUT_VALIDATION_SUCCESS,
  payload,
});

export const login = (username, password) => dispatch => new Promise((resolve) => {
  dispatch(submitLoginForm());
  axios.post('/auth/login', {
    email: username,
    password,
  }).then(({ data }) => {
    dispatch(loginSuccess(data));
    dispatch(clearLoginForm());
    dispatch(setCurrentUser(data));
    return resolve(data);
  }).catch(({ response: { data } }) => {
    dispatch(loginFailure(data));
    return resolve(data);
  });
});

export const inputValidation = (email, password) => dispatch => new Promise((resolve) => {
  if (!email.length || !password.length) {
    dispatch(inputValidationFailure('All fields are required'));
    return resolve('validationFailure');
  }
  if (!validator.validate(email) || password.length !== 6) {
    dispatch(inputValidationFailure('email and password don\'t match'));
    return resolve('validationFailure');
  }
  dispatch(inputValidationSuccess());
  return resolve('validationSuccess');
});
