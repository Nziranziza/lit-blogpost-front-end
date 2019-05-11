import {
  FETCHING_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCHING_POST,
  FETCH_POST_FAILURE,
  FETCH_POST_SUCCESS,
} from '../action-types';
import { posts as initialState } from '../initialState.json';

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_POSTS:
      return {
        ...state,
        fetching: false,
      };
    case FETCHING_POST:
      return {
        ...state,
        fetching: false,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        postList: payload,
        fetching: false,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        error: [
          ...state.error,
          payload,
        ],
        message: payload.message,
        fetching: false,
      };
    case FETCH_POST_FAILURE:
      return {
        ...state,
        error: [
          ...state.error,
          payload,
        ],
        message: payload.message,
        fetching: false,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        post: payload,
      };
    default:
      return state;
  }
};

export default postReducer;
