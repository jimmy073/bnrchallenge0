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
import { Beadcrumb, PageTitle } from "../components/utils";
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
} from "../store/actions/applications";
import moment from "moment";
import { createUserAccount } from "../store/actions/auth";

function ReviewingPage(props) {
  const CURRENTPAGE = "PROCESSING APPLICATIONS";
  const { t } = useTranslation();
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  const [uniclicked, setuniclicked] = useState(false);
  const role = localStorage.getItem("role");
  const [roleObject, setroleObject] = useState(role);
  const rleObject = {role:roleObject};

  const objectList = useSelector((state) => state.applications.applications);


  const application = useSelector((state) => state.applications.application);

  const dispatch = useDispatch();

const theusername = localStorage.getItem("username");
const token = localStorage.getItem("jwt");

const viewMore = (id) => {
    dispatch(getOneApplications(id));
    history.push(`/view-application/`+id)
  };

  useEffect(() => {
   dispatch(getApplicationsByRole(role))

  }, [

  ]);

  return (
    <>
      <Header />
      <div className="container">
        <Beadcrumb />
        <div className="pt-2">
         
        </div>
        <PageTitle pagetitle={CURRENTPAGE} />

        <div id="contact">
          <div className="col-md-9">
                    <div className="text-center">
                      <h5 className="bdf-bluefontcolor">List of applications</h5>
                    </div>
                    <div
                      className={
                        objectList?.length <= 0
                          ? "alert alert-danger text-center"
                          : "d-none"
                      }
                      role="alert"
                    >
                      There Are No Applications Found
                    </div>
                    <div className="justify-content-end">
                      <span
                        
                        className="bg-success btn text-white px-2 py-1 view-more"
                      >
                        <i class="bi bi-file-excel"></i> Excel
                      </span>
                    </div>
                    <table className="table table-striped text-center">
                      <thead>
                        <tr className="bdf-bluefontcolor">
                          <th>#</th>
                          <th>Application Name</th>
                          <th>Reference</th>
                          <th>State</th>
                          <th>Institution</th>
                          <th>Applied At</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {objectList?.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data?.applicationName}</td>
                            <td>{data?.reference}</td>
                            <td>{data?.state}</td>
                            <td>{data?.institution}</td>
                            <td>
                              {moment(data?.createdAt).format(
                                "DD/MM/YYYY hh:mm"
                              )}
                            </td>
                            <td className="row d-flex justify-content-center">
                              <ViewButton
                                title={"View "}
                                onClick={(e) => {
                                  e.preventDefault();
                                  viewMore(data?.id);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
        </div>
      </div>
    </>
  );
}

export default ReviewingPage;
