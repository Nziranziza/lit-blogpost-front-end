import {
  HANDLE_LOGIN_INPUT,
  SUBMIT_LOGIN_FORM,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  CLEAR_LOGIN,
} from '../action-types';
import { login as initialState } from '../initialState.json';

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_LOGIN:
      return initialState;
    case SUBMIT_LOGIN_FORM:
      return {
        ...state,
        submitting: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: [
          ...state.error,
          payload,
        ],
        message: payload.message,
        submitting: false,
      };
    case HANDLE_LOGIN_INPUT:
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
    case LOGIN_SUCCESS:
      return {
        ...state,
        message: payload.message,
      };
    default:
      return state;
  }
};

export default loginReducer;
