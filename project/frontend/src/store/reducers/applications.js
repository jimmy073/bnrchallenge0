import { updateObject } from "../../utils/utility";
import {
  GET_APPLICATIONS_START,
  GET_APPLICATIONS_SUCCESS,
  GET_ONE_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAIL,
  
  GET_INSTITUTIONS_START,
  GET_ONE_INSTITUTIONS_SUCCESS,
  GET_INSTITUTIONS_FAIL,
  GET_INSTITUTIONS_SUCCESS,

} from "../actions/applications";

const initialReducer = {
  application: null,
  applications: [],
  applicationsLoading: false,
  applicationsFail: null,
  institution: null,
  institutions: [],
  institutionsLoading: false,
  institutionsFail: null,
  
};

const applicationInitialization = (state, action) => {
  return updateObject(state, {
    applications: [],
    application: null,
    applicationsLoading: null,
    applicationsFail: null,
  });
};

const getApplicationsStart = (state, action) => {
  return updateObject(state, {
    applications: [],
    application: null,
    applicationsLoading: true,
    applicationsFail: null,
  });
};

const getApplicationsSuccess = (state, action) => {
  return updateObject(state, {
    applications: action.payload,
    applicationsLoading: false,
    applicationsFail: null,
    application: null,
  });
};

const getOneApplicationsSuccess = (state, action) => {
  return updateObject(state, {
    application: action.payload,
    applications: [],
    applicationsLoading: false,
    applicationsFail: null,
  });
};

const getApplicationsFail = (state, action) => {
  return updateObject(state, {
    applications: [],
    application: null,
    applicationsLoading: false,
    applicationsFail: action.payload,
  });
};

const getInstutionsStart = (state, action) => {
  return updateObject(state, {
    oldApplicants: [],
    oldApplicant: null,
    oldApplicantsLoading: true,
    oldApplicantsFail: null,
  });
};

const getInstutionsSuccess = (state, action) => {
  return updateObject(state, {
    oldApplicants: action.payload,
    oldApplicantsLoading: false,
    oldApplicantsFail: null,
    oldApplicant: null,
  });
};

const getOneInstutionsSuccess = (state, action) => {
  return updateObject(state, {
    oldApplicant: action.payload,
    oldApplicants: [],
    oldApplicantsLoading: false,
    oldApplicantsFail: null,
  });
};

const getInstutionsFail = (state, action) => {
  return updateObject(state, {
    oldApplicants: [],
    oldApplicant: null,
    oldApplicantsLoading: false,
    oldApplicantsFail: action.payload,
  });
};

const getFfsTraineesStart = (state, action) => {
  return updateObject(state, {
    ffstrainees: [],
    ffstrainee: null,
    ffstraineesLoading: true,
    ffstraineesFail: null,
  });
};

const getFfsTraineesSuccess = (state, action) => {
  return updateObject(state, {
    ffstrainees: action.payload,
    ffstraineesLoading: false,
    ffstraineesFail: null,
    ffstrainee: null,
  });
};

const getOneFfsTraineesSuccess = (state, action) => {
  return updateObject(state, {
    ffstrainee: action.payload,
    ffstrainees: [],
    ffstraineesLoading: false,
    ffstraineesFail: null,
  });
};

const getFfsTraineesFail = (state, action) => {
  return updateObject(state, {
    ffstrainees: [],
    ffstrainee: null,
    ffstraineesLoading: false,
    ffstraineesFail: action.payload,
  });
};

const getSelectedApplicantsStart = (state, action) => {
  return updateObject(state, {
    selectedApplicants: [],
    selectedApplicant: null,
    selectedApplicantsLoading: true,
    selectedApplicantsFail: null,
  });
};

const getSelectedApplicantsSuccess = (state, action) => {
  return updateObject(state, {
    selectedApplicants: action.payload,
    selectedApplicantsLoading: false,
    selectedApplicantsFail: null,
    selectedApplicant: null,
  });
};

const getOneSelectedApplicantsSuccess = (state, action) => {
  return updateObject(state, {
    selectedApplicant: action.payload,
    selectedApplicants: [],
    selectedApplicantsLoading: false,
    selectedApplicantsFail: null,
  });
};

const getSelectedApplicantsFail = (state, action) => {
  return updateObject(state, {
    selectedApplicants: [],
    selectedApplicant: null,
    selectedApplicantsLoading: false,
    selectedApplicantsFail: action.payload,
  });
};

const reducer = (state = initialReducer, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_START:
      return getApplicationsStart(state, action);
    case GET_APPLICATIONS_SUCCESS:
      return getApplicationsSuccess(state, action);
    case GET_ONE_APPLICATIONS_SUCCESS:
      return getOneApplicationsSuccess(state, action);
    case GET_APPLICATIONS_FAIL:
      return getApplicationsFail(state, action);
    case GET_INSTITUTIONS_START:
      return getInstutionsStart(state, action);
    case GET_INSTITUTIONS_SUCCESS:
      return getInstutionsSuccess(state, action);
    case GET_ONE_INSTITUTIONS_SUCCESS:
      return getOneInstutionsSuccess(state, action);
    case GET_INSTITUTIONS_FAIL:
      return getInstutionsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
