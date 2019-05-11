import {
  HANDLE_SIGNUP_INPUT,
  SUBMIT_SIGNUP_FORM,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  CLEAR_SIGNUP,
} from '../action-types';
import { signup as initialState } from '../initialState.json';

const signupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_SIGNUP:
      return initialState;
    case SUBMIT_SIGNUP_FORM:
      return {
        ...state,
        submitting: true,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: [
          ...state.error,
          payload,
        ],
        message: payload.message,
        submitting: false,
      };
    case HANDLE_SIGNUP_INPUT:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          [payload.name]: payload.value,
        },
      };
    case INPUT_VALIDATION_FAILURE:
      return {
        ...state,
        error: [
          ...state.error,
          payload,
        ],
        message: payload,
      };
    case INPUT_VALIDATION_SUCCESS:
      return {
        ...state,
        error: undefined,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        message: payload.message,
      };
    default:
      return state;
  }
};

export default signupReducer;
