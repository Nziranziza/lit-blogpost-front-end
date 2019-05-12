import loginReducer from "../../redux/reducers/loginReducer";
import { login } from "../../redux/initialState.json";
import {
  HANDLE_LOGIN_INPUT,
  SUBMIT_LOGIN_FORM,
  INPUT_VALIDATION_FAILURE,
  INPUT_VALIDATION_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  CLEAR_LOGIN
} from "../../redux/action-types";

describe("currentUserReducer", () => {
  test("should handle input", () => {
    const action = {
      type: HANDLE_LOGIN_INPUT,
      payload: {
        name: "password",
        value: "123456"
      }
    };
    const res = loginReducer(login, action);
    expect(res.credentials.password).toEqual(action.payload.value);
  });

  test("should handle SUBMIT_LOGIN_FORM", () => {
    const action = {
      type: SUBMIT_LOGIN_FORM,
    };
    const res = loginReducer(login, action);
    expect(res.submitting).toEqual(true);
  });

  test("should handle INPUT_VALIDATION_FAILURE", () => {
    const action = {
      type: INPUT_VALIDATION_FAILURE,
      payload: 'invalid input'
    };
    const res = loginReducer(login, action);
    expect(res.message).toEqual(action.payload);
  });

  test("should handle INPUT_VALIDATION_SUCCESS", () => {
    const action = {
      type: INPUT_VALIDATION_SUCCESS,
    };
    const res = loginReducer(login, action);
    expect(res.error).toBeUndefined();
  });

  test("should handle INPUT_VALIDATION_SUCCESS", () => {
    const action = {
      type: CLEAR_LOGIN,
    };
    const res = loginReducer(login, action);
    expect(res).toEqual(login);
  });

  test("should handle LOGIN_FAILURE", () => {
    const action = {
      type: LOGIN_FAILURE,
      payload: {
        message: 'user not found'
      }
    };
    const res = loginReducer(login, action);
    expect(res.message).toEqual(action.payload.message);
  });


  test("should handle LOGIN_FAILURE", () => {
    const action = {
      type: LOGIN_FAILURE,
      payload: {
        message: 'user not found'
      }
    };
    const res = loginReducer(login, action);
    expect(res.message).toEqual(action.payload.message);
  });

  test("should handle LOGIN_SUCCESS", () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: {
        message: 'login successfully'
      }
    };
    const res = loginReducer(login, action);
    expect(res.message).toEqual(action.payload.message);
  });

  test("should handle LOGIN_SUCCESS", () => {
    const action = {
      type: 'UNKNOWN_TYPE',
    };
    const res = loginReducer(login, action);
    expect(res).toEqual(login);
  });
});
