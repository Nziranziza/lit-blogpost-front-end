import currentUserReducer from '../../redux/reducers/currentUserReducer';
import { currentUser } from '../../redux/initialState.json';
import {
    SET_CURRENT_USER
} from '../../redux/action-types';

describe('currentUserReducer', () => {
    test('should handle setCurrentUser', () => {
     const action = {
       type: SET_CURRENT_USER,
       payload: {
         data: {},
         token:''
       }
     }
     const res = currentUserReducer(currentUser, action);
     expect(res.profile).toEqual(action.payload.data);
     expect(res.token).toEqual(action.payload.token);
     expect(res.isLoggedIn).toEqual(true);
    });

    test('should return default state', () => {
      const action = {
        type: 'UNKNOW_TYPE',
        payload: {
          data: {},
          token:''
        }
      }
      const res = currentUserReducer(currentUser, action);
      expect(res).toEqual(currentUser);
     });
})

