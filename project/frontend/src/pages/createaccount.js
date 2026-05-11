import { useEffect, useState } from "react";
import Header from "../components/header";
import {
  ActivateButton,
  InputEmail,
  InputNationalId,
  InputTelephone,
  InputText2,
  InputTextSecret2,
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
import moment from "moment";
import { createUserAccount } from "../store/actions/auth";

function CreateAccountPage() {
  const CURRENTPAGE = "ACCOUNT DETAILS";
  const { t } = useTranslation();
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  const [uniclicked, setuniclicked] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [telephone, settelephone] = useState("");
  const [email, setemail] = useState("");
  const [nationalId, setnationalId] = useState("");
  const [province, setProvince] = useState("");

  const [password, setpassword] = useState("");
  const [cfrmpassword, setcfrmpassword] = useState("");

  const [idrdbrcacertificate, setidrdbrcacertificate] = useState(null);

  const [idrdbrcacertificatetype, setidrdbrcacertificatetype] = useState(null);

  const [idRdbRcaCertificateError, setidRdbRcaCertificateError] =
    useState(true);

  const [isIDRDBRCAAttached, setisIDRDBRCAAttached] = useState(false);

  const MB5 = 5242880;

  const [idFileSize, setIdFileSize] = useState(0);

  const [submitted, setsubmitted] = useState(false);

  const application = useSelector((state) => state.applications.application);

  const dispatch = useDispatch();

  const [IdUniqueError, setIduniqueError] = useState("false");
  const [TelUniqueError, setTeluniqueError] = useState("false");
  const [EmailUniqueError, setEmailuniqueError] = useState("false");
  const [TINUniqueError, setTINUniqueError] = useState("false");

  const arrayToOptionsHandler = (arr = []) => {
    return arr.map((element) => {
      const item = {};
      item.value = element;
      if (element === "East") {
        item.name = element;
      } else if (element === "West") {
        item.name = element;
      } else if (element === "North") {
        item.name = element;
      } else if (element === "South") {
        item.name = element;
      } else if (element === "Kigali") {
        item.name = element;
      } else {
        item.name = element;
      }
      return item;
    });
  };

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

  useEffect(() => {
    if (idRdbRcaCertificateError && submitted) {
      setclicked(true);
    } else if (!idRdbRcaCertificateError && submitted) {
      setclicked(false);
    }

    if (application) {
      setfirstname(application?.firstname);
      setlastname(application?.lastname);
      setnationalId(application?.nationalId);
      settelephone(application?.telephone);
      setemail(application?.email);
    }
  }, [
    application,
    nationalId,
    email,
    telephone,
    idRdbRcaCertificateError,
    submitted,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    setsubmitted(true);
    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      nationalId.trim() === "" ||
      nationalId.trim().length !== 16 ||
      telephone.trim() === "" ||
      telephone.trim().length !== 10 ||
      email.trim() === ""
    ) {
      setclicked(true);
    } else {
      if (window.confirm("Are you sure you want submit?")) {
        let tel = telephone;
        if (telephone.startsWith("+25")) {
          tel = telephone.replace("+25", "");
        }
        const object = {
          isIDRDBRCAAttached,
          idrdbrcacertificate,

          firstName: firstname,
          lastName: lastname,
          telephone: tel,
          nationalId: nationalId,
          email: email,
          password: password,
        };
        dispatch(createUserAccount(object));
        setfirstname("");
        setlastname("");
        settelephone("");
        setemail("");
        setnationalId("");
        setclicked(false);
        history.push("/");
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
                          title={"First Name"}
                          value={firstname}
                          name="firstname"
                          placeholder={t("First Name")}
                          isClicked={clicked}
                          onChange={(e) => {
                            setfirstname(e.target.value);
                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputText2
                          title={"Last Name"}
                          value={lastname}
                          name="lastname"
                          placeholder={t("Last Name")}
                          isClicked={clicked}
                          onChange={(e) => {
                            setlastname(e.target.value);
                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex ">
                    <div className={"d-show col-sm-10 col-md-6"}>
                      <div className="form-group py-1">
                        <InputNationalId
                          unique={IdUniqueError}
                          title={"National ID "}
                          value={nationalId}
                          name="nationalId"
                          placeholder={"National ID"}
                          isClicked={clicked}
                          onChange={(e) => {
                            setnationalId(e.target.value);
                            setIduniqueError("false");
                            setclicked(false);
                            // dispatch(getOneUserByNIDStart());
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1 d-none">
                        <UplodadFile
                          title={"National ID (2MB)"}
                          name="idrdbrcacertificate"
                          fileError={idRdbRcaCertificateError}
                          required
                          isClicked={clicked}
                          onChange={idrdbrcacertificateFileHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex ">
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputEmail
                          unique={EmailUniqueError}
                          title={"E-mail"}
                          value={email}
                          name="email"
                          placeholder={"E-mail"}
                          isClicked={clicked}
                          onChange={(e) => {
                            setemail(e.target.value);
                           // dispatch(getOneUsersByEmailStart());
                            setEmailuniqueError("false");
                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputTelephone
                          unique={TelUniqueError}
                          title={"Telephone Number"}
                          value={telephone}
                          name="telephone"
                          placeholder={"07xxxxxxxx"}
                          isClicked={clicked}
                          onChange={(e) => {
                            settelephone(e.target.value);
                            setclicked(false);
                            setTeluniqueError("false");
                           // dispatch(getOneUsersByTelStart());
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex ">
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputTextSecret2
                          title={"Password"}
                          value={password}
                          name="password"
                          placeholder={"password"}
                          isClicked={clicked}
                          onChange={(e) => {
                            setpassword(e.target.value);
                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputTextSecret2
                          title={"Confirm Password"}
                          value={cfrmpassword}
                          name="cfrmpassword"
                          placeholder={""}
                          isClicked={clicked}
                          onChange={(e) => {
                            setcfrmpassword(e.target.value);
                            setclicked(false);
                          }}
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

export default CreateAccountPage;
