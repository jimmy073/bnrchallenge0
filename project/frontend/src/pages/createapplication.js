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
} from "../components/inputs";
import { Beadcrumb, PageTitle } from "../components/utils";
import { useTranslation } from "react-i18next";
import constants from "../components/constants";
import { Provinces, Districts, Sectors } from "rwanda";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createApplications,
  createInstution,
} from "../store/actions/applications";
import moment from "moment";
import { createUserAccount } from "../store/actions/auth";

function CreateApplicationPage() {
  const CURRENTPAGE = "REQUESTING LICENSE";
  const { t } = useTranslation();
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  const [uniclicked, setuniclicked] = useState(false);

  const [applicationName, setapplicationName] = useState("");
  const [description, setdescription] = useState("");
  const [contactPhone, setcontactPhone] = useState("");
  const [contactEmail, setcontactEmail] = useState("");
  const [applicationType, setapplicationType] = useState("");

  const [idrdbrcacertificate, setidrdbrcacertificate] = useState(null);
  const [idrdbrcacertificatetype, setidrdbrcacertificatetype] = useState(null);
  const [idRdbRcaCertificateError, setidRdbRcaCertificateError] =
    useState(true);

  const [businessplan, setbusinessplan] = useState(null);
  const [financialstatement, setfinancialstatement] = useState(null);
  const [businessplantype, setbusinessplantype] = useState(null);
  const [financialstatementtype, setfinancialstatementtype] = useState(null);

  const [filesError, setfilesError] = useState(0);
   const [filename, setfilename] = useState(
    "filename"
  );

  const [isIDRDBRCAAttached, setisIDRDBRCAAttached] = useState(false);

  const MB5 = 5242880;

  const [idFileSize, setIdFileSize] = useState(0);

  const [submitted, setsubmitted] = useState(false);

  const application = useSelector((state) => state.applications.application);

  const dispatch = useDispatch();

  const idrdbrcacertificateFileHandler = (event) => {
    const file = event.target.files[0];
    const parts = file?.name?.split(".");
    setidRdbRcaCertificateError(true);
    setisIDRDBRCAAttached(false);
    if (idRdbRcaCertificateError) {
      setclicked(false);
    } else {
      setclicked(true);
      setisIDRDBRCAAttached(true);
    }
    setidrdbrcacertificatetype(parts[parts.length - 1]);
    if (file?.name?.match(/\.(mp4|mpeg4|mov|avi|WebM|FLV|WMV|AVCHD)$/)) {
      //alert("File type must be PDF");
      setidRdbRcaCertificateError(true);
      setisIDRDBRCAAttached(false);
      setclicked(true);
    } else {
      if (file?.size > MB5) {
        setidRdbRcaCertificateError(true);
        setisIDRDBRCAAttached(false);
        setclicked(true);
      } else {
        setclicked(false);
        setidrdbrcacertificate(event.target.files[0]);
        setidRdbRcaCertificateError(false);
        setisIDRDBRCAAttached(true);
      }
    }
  };

  const businessplanFileHandler = (event) => {
    const file = event.target.files[0];
    const parts = file?.name?.split(".");
    setbusinessplantype(parts[parts.length - 1]);
    if (file?.name?.match(/\.(mp4|mpeg4|mov|avi|WebM|FLV|WMV|AVCHD)$/)) {
      //alert("File type must be PDF");
    } else {
      if (file?.size > MB5) {
        alert("THE FILE IS TOO BIG");
      } else {
        setbusinessplan(event.target.files[0]);
      }
    }
  };

  const financialstatementFileHandler = (event) => {
    const file = event.target.files[0];
    const parts = file?.name?.split(".");
    setfinancialstatement(parts[parts.length - 1]);
    if (file?.name?.match(/\.(mp4|mpeg4|mov|avi|WebM|FLV|WMV|AVCHD)$/)) {
      //alert("File type must be PDF");
    } else {
      if (file?.size > MB5) {
        alert("THE FILE IS TOO BIG");
      } else {
        setfinancialstatement(event.target.files[0]);
      }
    }
  };

  const setTheApplicantType = (value) => {
    setTheApplicantType(value);
    setclicked(false);
  };


const theOnSubmit=()=>{

   const fd = new FormData();
      if (
        typeof financialstatement?.name === "undefined" ||
        typeof businessplan?.name === "undefined"
      ) {
      //  dispatch(getApplicationsSuccesInit(submittedApplication?.applicant));
        setfilesError(1);
      } else {
        setfilesError(0);
      }

      fd.append(
        "financialstatement",
        financialstatement,
        filename + "FS." + financialstatementtype
      );
      fd.append(
        "businessplan",
        businessplan,
        filename + "BP." + businessplantype
      );

     // fd.append("object", JSON.stringify(objectToDB));
      // dispatch(applicationInitialization())
      dispatch(createApplications(fd));
      setsubmitted(true);
}
  

  useEffect(() => {
    if (idRdbRcaCertificateError && submitted) {
      setclicked(true);
    } else if (!idRdbRcaCertificateError && submitted) {
      setclicked(false);
    }

    if (application) {
      setapplicationName(application?.applicationName);
      setdescription(application?.description);
      setcontactPhone(application?.contactPhone);
      setcontactEmail(application?.contactEmail);
      setapplicationType(application?.getapplicationType);
    }
  }, [
    application,
    applicationName,
    description,
    contactEmail,
    contactPhone,
    idRdbRcaCertificateError,
    submitted,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();

    setsubmitted(true);
    if (
      applicationName.trim() === "" ||
      description.trim() === "" ||
      contactEmail.trim() === "" ||
      contactPhone.trim() === "" 
    ) {
      setclicked(true);
    } else {
      if (window.confirm("Are you sure you want submit?")) {
        const objectToDB = {
          applicationName,
          description,
          username: "irakizajimmy1@gmail.com",
          contactEmail,
          contactPhone,
          applicationType,
        };
       
        setapplicationName("");
        setdescription("");
       // setapplicationType("");
        setcontactEmail("");
        setcontactPhone("");
        setclicked(false);
        history.push("/create-application");


      const fd = new FormData();
      if (
        typeof financialstatement?.name === "undefined" ||
        typeof businessplan?.name === "undefined"
      ) {
      //  dispatch(getApplicationsSuccesInit(submittedApplication?.applicant));
        setfilesError(1);
      } else {
        setfilesError(0);
      }

      fd.append(
        "files",
        financialstatement,
        filename + "FS." + financialstatementtype
      );
      fd.append(
        "files",
        businessplan,
        filename + "BP." + businessplantype
      );

      fd.append("application", JSON.stringify(objectToDB));
      dispatch(createApplications(fd));
      setsubmitted(true);

      } else {
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Beadcrumb />
        <div className="pt-2"></div>
        <PageTitle pagetitle={CURRENTPAGE} />

        <div id="contact">
          <div className="" data-aos="fade-up">
            <div className="row d-flex php-email-form">
              <div className="col-md-12">
                <div>
                  <div className="row ">
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputText2
                          title={"Application Name"}
                          value={applicationName}
                          name="applicationName"
                          placeholder={t("Application Name")}
                          isClicked={clicked}
                          onChange={(e) => {
                            setapplicationName(e.target.value);
                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputText2
                          title={"Description"}
                          value={description}
                          name="description"
                          placeholder={t("Last Name")}
                          isClicked={clicked}
                          onChange={(e) => {
                            setdescription(e.target.value);
                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
T
                  <div className="row d-flex d-none">
                  <div className="col-sm-10 col-md-6">
                    <div className="form-group py-1">
                      
                    </div>
                  </div>
                </div>

                  <div className="row d-flex ">
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputEmail
                          title={"Contact Email"}
                          value={contactEmail}
                          name="contactEmail"
                          placeholder={"E-mail"}
                          isClicked={clicked}
                          onChange={(e) => {
                            setcontactEmail(e.target.value);
                            // dispatch(getOneUsersByEmailStart());

                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputTelephone
                          title={"Contact Phone"}
                          value={contactPhone}
                          name="contactPhone"
                          placeholder={"07xxxxxxxx"}
                          isClicked={clicked}
                          onChange={(e) => {
                            setcontactPhone(e.target.value);
                            setclicked(false);

                            // dispatch(getOneUsersByTelStart());
                          }}
                        />
                      </div>
                    </div>
                  </div>
                
                  <div className="row d-flex ">
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <div className="form-group py-1">
                          <UplodadFile
                            title="Business Plan (5MB)"
                            name="businessplan"
                            required
                            onChange={businessplanFileHandler}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <UplodadFile
                          title="Financial Statement (5MB)"
                          name="financialstatement"
                          required
                          onChange={financialstatementFileHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-3">
                    <div className="row gx-5"></div>
                    <SubmitButton
                      action={"Submit"}
                      disabled={clicked}
                      onSubmit={onSubmit}
                    />
                    <span className="px-2"></span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex gy-5 ml-5 justify-content-end"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateApplicationPage;
