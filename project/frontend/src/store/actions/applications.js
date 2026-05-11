import axios from "../../axios-base";

export const GET_APPLICATIONS_SUCCESS = "GET_APPLICATIONS_SUCCESS";
export const GET_ONE_APPLICATIONS_SUCCESS = "GET_ONE_APPLICATIONS_SUCCESS";
export const GET_APPLICATIONS_START = "GET_APPLICATIONS_START";
export const GET_APPLICATIONS_FAIL = "GET_APPLICATIONS_FAIL";

export const GET_INSTITUTIONS_SUCCESS = "GET_INSTITUTIONS_SUCCESS";
export const GET_ONE_INSTITUTIONS_SUCCESS = "GET_ONE_INSTITUTIONS_SUCCESS";
export const GET_INSTITUTIONS_START = "GET_INSTITUTIONS_START";
export const GET_INSTITUTIONS_FAIL = "GET_INSTITUTIONS_FAIL";


export const getApplicationsSuccess = (data) => {
  return {
    type: GET_APPLICATIONS_SUCCESS,
    payload: data,
  };
};

export const getApplicationsSuccesInit = (data) => {
  return {
    type: GET_ONE_APPLICATIONS_SUCCESS,
    payload: data,
  };
};

export const getOneApplicationsSuccess = (data) => {
  return {
    type: GET_ONE_APPLICATIONS_SUCCESS,
    payload: data,
  };
};

export const getApplicationsStart = () => {
  return {
    type: GET_APPLICATIONS_START,
  };
};

export const getApplicationsFail = (error) => {
  const err = error?.response?.data?.message;
  return {
    type: GET_APPLICATIONS_FAIL,
    payload: err,
  };
};

export const getApplications = (lang) => {
  return (dispatch) => {
    dispatch(getApplicationsStart());
    axios
      .get(`/applications/applications`)
      .then((response) => {
        dispatch(getApplicationsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getApplicationsFail(err));
      });
  };
};

export const getApplicationsByRole = (role) => {
  return (dispatch) => {
    dispatch(getApplicationsStart());
    axios
      .get(`/applications/applications/role`, {
        params: {
          role: role
        }
      })
      .then((response) => {
        dispatch(getApplicationsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getApplicationsFail(err));
      });
  };
};

export const getApplicationsReport = (object) => {
  return (dispatch) => {
    dispatch(getApplicationsStart());
    axios
      .post(`/applications/reports`, object)
      .then((response) => {
        dispatch(getApplicationsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getApplicationsFail(err));
      });
  };
};

export const createApplications = (object) => {
  return (dispatch) => {
    dispatch(getApplicationsStart());
    axios
      .post(`/applications/create-application-v2`, object)
      .then((response) => {
        dispatch(getOneApplicationsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getApplicationsFail(err));
      });
  };
};


export const getOneApplications = (id) => {
  return (dispatch) => {
    dispatch(getApplicationsStart());
    axios
      .get(`/applications/applications/find/${id}`)
      .then((response) => {
        dispatch(getOneApplicationsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getApplicationsFail(err));
      });
  };
};

export const moveApplication=(object)=>{
  console.log(object);
return (dispatch) => {
    dispatch(getApplicationsStart());
    axios
      .put(`/applications/approve-application`,{"username":"admin@bnr.rw",
    "applicationId":6,
    "newState":"APPROVE",
    "comment":"We request this to be approved"})
      .then((response) => {
        dispatch(getOneApplicationsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getApplicationsFail(err));
      });
  };
}


export const activatingApplications = (token, id) => {
  return (dispatch) => {
    dispatch(getApplicationsStart());
    axios
      .put(`/applications/activating/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneApplicationsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getApplicationsFail(err));
      });
  };
};

export const updateApplications = (token, object) => {
  return (dispatch) => {
    dispatch(getApplicationsStart());
    axios
      .put(`/applications/edit/${object?.id}`, object, {
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneApplicationsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getApplicationsFail(err));
      });
  };
};


  

  export const getInstutionsSuccess = (data) => {
    return {
      type: GET_INSTITUTIONS_SUCCESS,
      payload: data,
    };
  };
  
  export const getOneInstutionsSuccess = (data) => {
    return {
      type: GET_ONE_INSTITUTIONS_SUCCESS,
      payload: data,
    };
  };
  
  export const getInstutionsStart = () => {
    return {
      type: GET_INSTITUTIONS_START,
    };
  };
  export const getInstutionsFail = (error) => {
    return {
      type: GET_INSTITUTIONS_FAIL,
      payload: error,
    };
  };
  

  export const createInstution = (object, token) => {
  return (dispatch) => {
    dispatch(getInstutionsStart());
    axios
      .post(`/applications/create-institution`, object,{
        headers: { Authorization: token },
      })
      .then((response) => {
        dispatch(getOneInstutionsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getInstutionsFail(err));
      });
  };
};

  export const findOneInstutions = (id) => {
    return (dispatch) => {
      dispatch(getInstutionsStart());
      axios
        .get(`/applicationns/find-one`, id)
        .then((response) => {
          dispatch(getOneInstutionsSuccess(response.data));
        })
        .catch((err) => {
          dispatch(getInstutionsFail(err));
        });
    };
  };
