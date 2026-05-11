import { useEffect, useState } from "react";
import Header from "../components/header";
import {
  ActivateButton,
  InputEmail,
  InputNationalId,
  InputTelephone,
  InputText2,
  InputText22nd,
  InputTextSecret2,
  InputTIN,
  SelectInput,
  SubmitButton,
  UplodadFile,
  ViewButton,
} from "../components/inputs";
import { Beadcrumb, FileDetails, ObjectDetails, PageTitle } from "../components/utils";
import { useTranslation } from "react-i18next";
import constants from "../components/constants";
import { Provinces, Districts, Sectors } from "rwanda";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createInstution,
  getApplications,
  getApplicationsByRole,
  getOneApplications,
  moveApplication,
} from "../store/actions/applications";
import moment from "moment";
import { createUserAccount } from "../store/actions/auth";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ViewMoreApplicationDetailsPage(props) {
  const CURRENTPAGE = "APPLICATION DETAILS";
  const { t } = useTranslation();
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  const [uniclicked, setuniclicked] = useState(false);
  const role = localStorage.getItem("role");
  const [roleObject, setroleObject] = useState(role);
  const rleObject = { role: roleObject };

  const objectList = useSelector((state) => state.applications.applications);

  const application = useSelector((state) => state.applications.application);

  const dispatch = useDispatch();
  const params = useParams();
  const theusername = localStorage.getItem("username");
  const token = localStorage.getItem("jwt");

  const onsubmit = (id, action) => {
    let state ="";
    if (action == "approve" && role == "ROLE_REVIEWER") {
        state = "COMPLETE_REVIEW";
    }else if (action == "reject" && role == "ROLE_REVIEWER") {
        state = "REJECT";
    }else if (action == "request" && role == "ROLE_REVIEWER") {
        state = "REQUEST_INFO";
    }else if (action == "approve" && role == "ROLE_VERIFIER") {
        state = "VERIFY";
    }else if (action == "reject" && role == "ROLE_VERIFIER") {
        state = "REJECT";
    }else if (action == "request" && role == "ROLE_VERIFIER") {
        state = "REQUEST_INFO";
    }else if (action == "approve" && role == "ROLE_APPROVER") {
        console.log("Arrived");
        state = "APPROVE";
    }else if (action == "reject" && role == "ROLE_APPROVER") {
        state = "REJECT";
    }
    
    const objectToDB = {
      username: theusername,
      applicationId: id,
      newState: state,
      comment: "Capture comment",
    };

    dispatch(moveApplication(objectToDB))

  };

  useEffect(() => {
    if (params?.objectId) {
      dispatch(getOneApplications(params?.objectId));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Beadcrumb />
        <div className="pt-2"></div>
        <PageTitle pagetitle={CURRENTPAGE} />

        <div id="contact">
          <div className="col-md-9">
            <div className="text-center">
              <h5 className="bdf-bluefontcolor"></h5>
            </div>
            <ObjectDetails
              title={"Application Name"}
              value={application?.applicationName}
            />
            <ObjectDetails
              title={"Application State"}
              value={application?.state}
            />
            <ObjectDetails
              title={"Description"}
              value={application?.description}
            />
            <FileDetails
              title={"Description"}
              value={application?.description}
            />
            ACTIONS
            <div className="row d-flex">
              <ViewButton
                title={"Reviewed"}
                actiontype="approve"
                onClick={(e) => {
                  e.preventDefault();
                  onsubmit(application?.id, "approve");
                }}
              />
              <ViewButton
                title={"Request Info"}
                actiontype="request"
                onClick={(e) => {
                  e.preventDefault();
                  onsubmit(application?.id, "request");
                }}
              />

              <ViewButton
                title={"Reject"}
                actiontype="reject"
                onClick={(e) => {
                  e.preventDefault();
                  onsubmit(application?.id, "reject");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewMoreApplicationDetailsPage;
