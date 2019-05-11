import {
  SET_CURRENT_USER,
} from '../action-types';
import { currentUser as initialState } from '../initialState.json';

const currentUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        profile: payload.data,
        token: payload.token,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default currentUserReducer;
