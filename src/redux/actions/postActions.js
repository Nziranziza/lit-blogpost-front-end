import {
  FETCHING_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCHING_POST,
  FETCH_POST_FAILURE,
  FETCH_POST_SUCCESS,
} from '../action-types';
import axios from '../../helpers/axios';

export const fetchingPosts = payload => ({
  type: FETCHING_POSTS,
  payload,
});

export const fetchPostsSuccess = payload => ({
  type: FETCH_POSTS_SUCCESS,
  payload,
});

export const fetchPostsFailure = payload => ({
  type: FETCH_POSTS_FAILURE,
  payload,
});

export const fetchingPost = () => ({
  type: FETCHING_POST,
});

export const fetchPostSuccess = payload => ({
  type: FETCH_POST_SUCCESS,
  payload,
});

export const fetchPostFailure = payload => ({
  type: FETCH_POST_FAILURE,
  payload,
});

export const fetchPosts = () => dispatch => new Promise((resolve) => {
  dispatch(fetchingPosts());
  axios.get('/posts').then(({ data }) => {
    dispatch(fetchPostsSuccess(data.posts));
    return resolve(data);
  }).catch(({ response: { data } }) => {
    dispatch(fetchPostsFailure(data));
    return resolve(data);
  });
});

export const fetchPost = id => dispatch => new Promise((resolve) => {
  dispatch(fetchingPost());
  axios.get(`/posts/${id}`).then(({ data }) => {
    dispatch(fetchPostSuccess(data.data));
    return resolve(data);
  }).catch(({ response: { data } }) => {
    dispatch(fetchPostFailure(data));
    return resolve(data);
  });
});
