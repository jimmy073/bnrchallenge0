import { updateObject } from "../../utils/utility";
import {
  GET_APPLICATIONS_START,
  GET_APPLICATIONS_SUCCESS,
  GET_ONE_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAIL,
  
  GET_APPLICATIONS_BY_TIN_FAIL,
  GET_APPLICATIONS_BY_TIN_START,
  GET_ONE_APPLICATIONS_BY_TIN_SUCCESS,
  GET_APPLICATIONS_BY_TEL_FAIL,
  GET_APPLICATIONS_BY_TEL_START,
  GET_ONE_APPLICATIONS_BY_TEL_SUCCESS,
  GET_APPLICATIONS_BY_NID_FAIL,
  GET_APPLICATIONS_BY_NID_START,
  GET_ONE_APPLICATIONS_BY_NID_SUCCESS,
  GET_APPLICATIONS_BY_EMAIL_FAIL,
  GET_APPLICATIONS_BY_EMAIL_START,
  GET_ONE_APPLICATIONS_BY_EMAIL_SUCCESS,

  
  GET_INSTITUTIONS_START,
  GET_ONE_INSTITUTIONS_SUCCESS,
  GET_INSTITUTIONS_FAIL,
  GET_INSTITUTIONS_SUCCESS,


  APPLICATON_INITIALIZATION,
  GET_FFS_TRAINEES_START,
  GET_ONE_FFS_TRAINEES_SUCCESS,
  GET_FFS_TRAINEES_FAIL,
  GET_FFS_TRAINEES_SUCCESS,
  GET_SELECTED_APPLICANTS_START,
  GET_ONE_SELECTED_APPLICANTS_SUCCESS,
  GET_SELECTED_APPLICANTS_FAIL,
  GET_SELECTED_APPLICANTS_SUCCESS,
} from "../actions/applications";

const initialReducer = {
  application: null,
  applications: [],
  applicationsLoading: false,
  applicationsFail: null,
  applicationByTin: null,
  applicationByTinLoading: false,
  applicationByTinFail: null,
  applicationByNid: null,
  applicationByNidLoading: false,
  applicationByNidFail: null,
  applicationByEmail: null,
  applicationByEmailLoading: false,
  applicationByEmailFail: null,
  applicationByTel: null,
  applicationByTelLoading: false,
  applicationByTelFail: null,
  institution: null,
  institutions: [],
  institutionsLoading: false,
  institutionsFail: null,
  ffstrainee: null,
  ffstrainees: [],
  ffstraineesLoading: false,
  ffstraineesFail: null,
  selectedApplicant: null,
  selectedApplicants: [],
  selectedApplicantsLoading: false,
  selectedApplicantsFail: null,
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

const getApplicationsByTinStart = (state, action) => {
  return updateObject(state, {
    applicationByTin: null,
    applicationByTinLoading: true,
    applicationByTinFail: null,
  });
};

const getOneApplicationsByTinSuccess = (state, action) => {
  return updateObject(state, {
    applicationByTin: action.payload,
    applicationByTinLoading: false,
    applicationByTinFail: null,
  });
};

const getApplicationsByTinFail = (state, action) => {
  return updateObject(state, {
    applicationByTin: null,
    applicationByTinLoading: false,
    applicationByTinFail: action.payload,
  });
};

const getApplicationsByTelStart = (state, action) => {
  return updateObject(state, {
    applicationByTel: null,
    applicationByTelLoading: true,
    applicationByTelFail: null,
  });
};

const getOneApplicationsByTelSuccess = (state, action) => {
  return updateObject(state, {
    applicationByTel: action.payload,
    applicationByTelLoading: false,
    applicationByTelFail: null,
  });
};

const getApplicationsByTelFail = (state, action) => {
  return updateObject(state, {
    applicationByTel: null,
    applicationByTelLoading: false,
    applicationByTelFail: action.payload,
  });
};

const getApplicationsByNidStart = (state, action) => {
  return updateObject(state, {
    applicationByNid: null,
    applicationByNidLoading: true,
    applicationByNidFail: null,
  });
};

const getOneApplicationsByNidSuccess = (state, action) => {
  return updateObject(state, {
    applicationByNid: action.payload,
    applicationByNidLoading: false,
    applicationByNidFail: null,
  });
};

const getApplicationsByNidFail = (state, action) => {
  return updateObject(state, {
    applicationByNid: null,
    applicationByNidLoading: false,
    applicationByNidFail: action.payload,
  });
};

const getApplicationsByEmailStart = (state, action) => {
  return updateObject(state, {
    applicationByEmail: null,
    applicationByEmailLoading: true,
    applicationByEmailFail: null,
  });
};

const getOneApplicationsByEmailSuccess = (state, action) => {
  return updateObject(state, {
    applicationByEmail: action.payload,
    applicationByEmailLoading: false,
    applicationByEmailFail: null,
  });
};

const getApplicationsByEmailFail = (state, action) => {
  return updateObject(state, {
    applicationByEmail: null,
    applicationByEmailLoading: false,
    applicationByEmailFail: action.payload,
  });
};

const getOldApplicantsStart = (state, action) => {
  return updateObject(state, {
    oldApplicants: [],
    oldApplicant: null,
    oldApplicantsLoading: true,
    oldApplicantsFail: null,
  });
};

const getOldApplicantsSuccess = (state, action) => {
  return updateObject(state, {
    oldApplicants: action.payload,
    oldApplicantsLoading: false,
    oldApplicantsFail: null,
    oldApplicant: null,
  });
};

const getOneOldApplicantsSuccess = (state, action) => {
  return updateObject(state, {
    oldApplicant: action.payload,
    oldApplicants: [],
    oldApplicantsLoading: false,
    oldApplicantsFail: null,
  });
};

const getOldApplicantsFail = (state, action) => {
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
    case APPLICATON_INITIALIZATION:
      return applicationInitialization(state, action);
    case GET_APPLICATIONS_START:
      return getApplicationsStart(state, action);
    case GET_APPLICATIONS_SUCCESS:
      return getApplicationsSuccess(state, action);
    case GET_ONE_APPLICATIONS_SUCCESS:
      return getOneApplicationsSuccess(state, action);
    case GET_APPLICATIONS_FAIL:
      return getApplicationsFail(state, action);
    case GET_APPLICATIONS_BY_TIN_START:
      return getApplicationsByTinStart(state, action);
    case GET_ONE_APPLICATIONS_BY_TIN_SUCCESS:
      return getOneApplicationsByTinSuccess(state, action);
    case GET_APPLICATIONS_BY_TIN_FAIL:
      return getApplicationsByTinFail(state, action);
    case GET_APPLICATIONS_BY_TEL_START:
      return getApplicationsByTelStart(state, action);
    case GET_ONE_APPLICATIONS_BY_TEL_SUCCESS:
      return getOneApplicationsByTelSuccess(state, action);
    case GET_APPLICATIONS_BY_TEL_FAIL:
      return getApplicationsByTelFail(state, action);
    case GET_APPLICATIONS_BY_NID_START:
      return getApplicationsByNidStart(state, action);
    case GET_ONE_APPLICATIONS_BY_NID_SUCCESS:
      return getOneApplicationsByNidSuccess(state, action);
    case GET_APPLICATIONS_BY_NID_FAIL:
      return getApplicationsByNidFail(state, action);
    case GET_APPLICATIONS_BY_EMAIL_START:
      return getApplicationsByEmailStart(state, action);
    case GET_ONE_APPLICATIONS_BY_EMAIL_SUCCESS:
      return getOneApplicationsByEmailSuccess(state, action);
    case GET_APPLICATIONS_BY_EMAIL_FAIL:
      return getApplicationsByEmailFail(state, action);
    case GET_OLD_APPLICANTS_START:
      return getOldApplicantsStart(state, action);
    case GET_OLD_APPLICANTS_SUCCESS:
      return getOldApplicantsSuccess(state, action);
    case GET_ONE_OLD_APPLICANTS_SUCCESS:
      return getOneOldApplicantsSuccess(state, action);
    case GET_OLD_APPLICANTS_FAIL:
      return getOldApplicantsFail(state, action);
    case GET_FFS_TRAINEES_START:
      return getFfsTraineesStart(state, action);
    case GET_FFS_TRAINEES_SUCCESS:
      return getFfsTraineesSuccess(state, action);
    case GET_ONE_FFS_TRAINEES_SUCCESS:
      return getOneFfsTraineesSuccess(state, action);
    case GET_FFS_TRAINEES_FAIL:
      return getFfsTraineesFail(state, action);
    case GET_SELECTED_APPLICANTS_START:
      return getSelectedApplicantsStart(state, action);
    case GET_SELECTED_APPLICANTS_SUCCESS:
      return getSelectedApplicantsSuccess(state, action);
    case GET_ONE_SELECTED_APPLICANTS_SUCCESS:
      return getOneSelectedApplicantsSuccess(state, action);
    case GET_SELECTED_APPLICANTS_FAIL:
      return getSelectedApplicantsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
