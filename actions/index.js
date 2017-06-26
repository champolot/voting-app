import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';

export function userLogin(userID) {
  const url = `/user/login/${ userID }`;  // production
  // const url = `http://localhost:8000/user/login/${ userID }`; // development
  const request = axios.get(url);

  return {
    type: USER_LOGIN,
    payload: request
  };
}

export const USER_LOGOUT = 'USER_LOGOUT';

export function userLogout() {
  return {
    type: USER_LOGOUT,
    payload: null
  }
}

export const GET_ALL_POLLS = 'GET_ALL_POLLS';

export function getAllPolls() {
  const url = '/polls/all';  // production
  // const url = 'http://localhost:8000/polls/all'; // development
  const request = axios.get(url);

  return {
    type: GET_ALL_POLLS,
    payload: request
  };
}

export const GET_POLL = 'GET_POLL';

export function getPoll(id) {
  const url = `/getpoll/${ id }`; // production
  // const url = `http://localhost:8000/getpoll/${ id }`; // development
  const request = axios.get(url);

  return {
    type: GET_POLL,
    payload: request
  };
}

export const MAP_LOCAL_STORE = 'MAP_LOCAL_STORE';

export function mapLocalStore(localStore) {
  return {
    type: MAP_LOCAL_STORE,
    payload: localStore
  };
}
