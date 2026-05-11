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
  createInstution,
} from "../store/actions/applications";
import moment from "moment";
import { createUserAccount } from "../store/actions/auth";

function CreateInstitutionPage(props) {
  const CURRENTPAGE = "INSTITUTION DETAILS";
  const { t } = useTranslation();
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  const [uniclicked, setuniclicked] = useState(false);

  const [name, setname] = useState("");
  const [abbreviation, setabbreviation] = useState("");
  const [tin, settin] = useState("");
  const [email, setemail] = useState("");
  const [nationalId, setnationalId] = useState("");
  const [province, setProvince] = useState("");

  const [password, setpassword] = useState("");
  const [cfrmpassword, setcfrmpassword] = useState("");

  const [genderError, setGenderError] = useState(false);

  const [membersError, setmembersError] = useState(false);

  const [idrdbrcacertificate, setidrdbrcacertificate] = useState(null);

  const [idrdbrcacertificatetype, setidrdbrcacertificatetype] = useState(null);

  const [idRdbRcaCertificateError, setidRdbRcaCertificateError] =
    useState(true);

  
  const [isIDRDBRCAAttached, setisIDRDBRCAAttached] = useState(false);

  const MB3 = 5242880;

  const [idFileSize, setIdFileSize] = useState(0);

  const [submitted, setsubmitted] = useState(false);

  const application = useSelector((state) => state.applications.application);

  const dispatch = useDispatch();

const theusername = localStorage.getItem("username");
const token = localStorage.getItem("jwt");

  const arrayToOptionsHandler = (arr = []) => {
    return arr.map((element) => {
      const item = {};
      item.value = element;
      if (element === "East") {
        item.name = element + " | Uburasirazuba";
      } else if (element === "West") {
        item.name = element + " | Uburengerazuba";
      } else if (element === "North") {
        item.name = element + " | Amajyaruguru";
      } else if (element === "South") {
        item.name = element + " | Amajyepfo";
      } else if (element === "Kigali") {
        item.name = element + " City | Umujyi wa Kigali";
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
      if (file?.size > MB3) {
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
      setname(application?.name);
      setabbreviation(application?.abbreviation);
      setnationalId(application?.nationalId);
      settin(application?.tin);
      setemail(application?.email);
      settin(application?.tin);

    }

  }, [
    application,
    nationalId,
    email,
    tin,
    idRdbRcaCertificateError,
    submitted
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    setsubmitted(true);
        if (
          name.trim() === "" ||
          abbreviation.trim() === "" ||
          tin.trim() === "" ||
          tin.trim().length !== 9 
        ) {
          setclicked(true);
        } else {
            if (
              window.confirm("Are you sure you want submit?")
            ) {
           
              const object = {
                name, tin, abbreviation, username:theusername,
                province:"prov", district:"D", sector:"S",

              };
              dispatch(createInstution(object, token));
              setname("");
              setabbreviation("");
              settin("");
              setclicked(false);
              history.push("/create-institution");
            } else {
            }
          
        
       }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Beadcrumb />
        <div className="pt-2">
         
        </div>
        <PageTitle pagetitle={CURRENTPAGE} />

        <div id="contact">
          <div className="" data-aos="fade-up">
            <div className="row d-flex php-email-form">
              <div className="col-md-12">
                <div
                >
                  <div className="row ">
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputText2
                          title={"Bank Name"}
                          value={name}
                          name="name"
                          placeholder={t("First Name")}
                          isClicked={clicked}
                          onChange={(e) => {
                            setname(e.target.value);
                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                        <InputText2
                          title={"Abbreviation"}
                          value={abbreviation}
                          name="abbreviation"
                          placeholder={t("Last Name")}
                          isClicked={clicked}
                          onChange={(e) => {
                            setabbreviation(e.target.value);
                            setclicked(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex ">
                    <div className="col-sm-10 col-md-6">
                      <div className="form-group py-1">
                       <InputTIN
                          type={"tin"}
                          title={"TIN"}
                          value={tin}
                          name="tin"
                          placeholder={"TIN Number"}
                          isClicked={clicked}
                          onChange={(e) => {
                            settin(e.target.value);
                            setclicked(false);
                           // setTINUniqueError("false");
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

export default CreateInstitutionPage;
