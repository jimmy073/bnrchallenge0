import axios from "../../axios-base";

export const AUTHENTICATE = "AUTHENTICATE";
export const AUTHENTICATION_START = "AUTHENTICATION_START";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_FAIL = "AUTHENTICATION_FAIL";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const AUTHENTICATION_LOGOUT = "AUTHENTICATION_LOGOUT";
export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_ONE_USERS_SUCCESS = "GET_ONE_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

export const authenticate = () => {
  return {
    type: AUTHENTICATE,
  };
};

export const authStart = () => {
  return {
    type: AUTHENTICATION_START,
  };
};

export const authSuccess = (authData) => {
  localStorage.setItem("jwt", 'Bearer '+ authData.token);
  localStorage.setItem("role", authData.role);
  localStorage.setItem("username", authData.username);
  return {
    type: AUTHENTICATION_SUCCESS,
    token: authData.token,
    userId: authData.id,
    displayName: authData.firstname,
    telephone: authData.telephone,
    title:authData.title,
    role:authData.role,
    username:authData.username,
  };
};

export const userCreatedSuccess = (authData) => {
  return {
    type: CREATE_USER_SUCCESS,
    token: authData.token,
    username: authData.user.email,
    telephone: authData.user.telephone,
    user: authData.user,
  };
};

export const authFail = (error) => {
  return {
    type: AUTHENTICATION_FAIL,
    error: error.message,
  };
};
export const authLogout = () => {
  localStorage.removeItem("jwt");
  return {
    type: AUTHENTICATION_LOGOUT,
  };
};

export const getUsersStart = () => {
  return {
    type: GET_USERS_START,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
};

export const getOneUsersSuccess = (user) => {
  return {
    type: GET_ONE_USERS_SUCCESS,
    payload: user,
  };
};

export const getUsersFail = (error) => {
  return {
    type: GET_USERS_FAIL,
    error: error,
  };
};

export const getUsers = () => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .get(`/users`)
      .then((response) => {
        dispatch(getUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err.message));
      });
  };
};

export const login = (username, password = "") => {
  return (dispatch) => {
    dispatch(authStart());
    let authData = {
      email:username,
      password,
    };
    axios
      .post("/login", authData)
      .then((response) => {
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(authLogout());
  };
};

export const createUsersByAdmin = (object, token) => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .post(`/users/create`, object, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err));
      });
  };
};

export const createUserAccount = (object) => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .post(`/create-account`, object)
      .then((response) => {
        dispatch(getOneUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err));
      });
  };
};

export const getOneUsers = (token, id) => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .get(`/users/find/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err));
      });
  };
};

export const activatingUsers = (token, id) => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .put(`/users/activating/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err));
      });
  };
};

export const desActivatingUsers = (token, id) => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .put(`/users/desactivating/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err));
      });
  };
};

export const updateUsers = (token, object) => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .put(`/users/edit/${object?.id}`, object, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err));
      });
  };
};

export const changePassword = (object, token) => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .put(`/users/change-pswd/${object?.id}`, object, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getUsersFail(err));
      });
  };
};
