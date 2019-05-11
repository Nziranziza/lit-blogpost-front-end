import {
  SET_CURRENT_USER,
} from '../action-types/currentUserTypes';

export default payload => ({
  type: SET_CURRENT_USER,
  payload,
});
