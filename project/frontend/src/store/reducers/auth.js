import { updateObject } from "../../utils/utility";
import {
  AUTHENTICATE,
  AUTHENTICATION_START,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  CREATE_USER_SUCCESS,
  AUTHENTICATION_LOGOUT,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_ONE_USERS_SUCCESS,
  GET_USERS_FAIL,
} from "../actions/auth";

const initialReducer = {
  token: null,
  userId: null,
  username: null,
  displayName: null,
  error: null,
  loading: false,
  path: "/",
  users: [],
  usersError: null,
  usersLoading: false,
  user: null,
  telephone: null,
  title: null,
  role: null,
};

const authenticate = (state, action) => {
  return updateObject(state, {
    token: "token",
  });
};

const authStart = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    username: null,
    displayName: null,
    error: null,
    loading: true,
    user: null,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    username: action.username,
    displayName: action.displayName,
    telephone: null,
    error: null,
    loading: false,
    user: action.user,
    telephone: action.telephone,
    title: action.title,
    role: action.role,
  });
};

const userCreatedSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: null,
    username: action.username,
    displayName: null,
    error: null,
    loading: false,
    user: action.user,
    telephone: action.telephone,
    title: action.title,
    role: action.role,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    username: null,
    displayName: null,
    error: action.error,
    loading: false,
    user: null,
    telephone: null,
    title: null,
    role: null,
  });
};

const logout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    name: null,
    displayName: null,
    error: null,
    user: null,
  });
};

const getUsersStart = (state, action) => {
  return updateObject(state, {
    users: [],
    usersError: null,
    usersLoading: true,
    user: null,
  });
};

const getUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.payload,
    usersError: null,
    usersLoading: false,
    user: null,
  });
};

const getUsersFail = (state, action) => {
  return updateObject(state, {
    users: [],
    usersError: action.payload,
    usersLoading: false,
    user: null,
  });
};

const getOneUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: [],
    usersError: null,
    usersLoading: false,
    user: action.payload,
  });
};

const reducer = (state = initialReducer, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return authenticate(state, action);
    case AUTHENTICATION_START:
      return authStart(state, action);
    case AUTHENTICATION_SUCCESS:
      return authSuccess(state, action);
    case AUTHENTICATION_FAIL:
      return authFail(state, action);
    case AUTHENTICATION_LOGOUT:
      return logout(state, action);
    case GET_USERS_START:
      return getUsersStart(state, action);
    case GET_USERS_SUCCESS:
      return getUsersSuccess(state, action);
    case GET_ONE_USERS_SUCCESS:
      return getOneUsersSuccess(state, action);
    case GET_USERS_FAIL:
      return getUsersFail(state, action);
    case CREATE_USER_SUCCESS:
      return userCreatedSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
