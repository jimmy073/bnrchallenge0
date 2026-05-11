import { combineReducers } from "redux";
import authReducer from "../reducers/auth";
import applicationsReducer from "../reducers/applications";

export default combineReducers({
  auth: authReducer,
  applications: applicationsReducer,
});
