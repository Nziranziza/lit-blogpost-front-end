import { combineReducers } from 'redux';
import login from './loginReducer';
import signup from './signupReducer';
import currentUser from './currentUserReducer';
import posts from './postReducer';

const reducer = combineReducers({
  login,
  signup,
  currentUser,
  posts,
});

export default reducer;
