import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export const Beadcrumb = () => {
  return <div className="breadcrumbs-modified d-flex align-items-center"></div>;
};

export const MiSpinner =(props)=> {
  return (
    <div className="text-center align-middle mi-spinner">
      <Spinner animation="border" variant="primary" size="xl" />
    </div>
  );
}

export const ObjectDetails = function (props) {
  return (
    <div className="pb-1">
      <span className="text-primary">{props?.title}:</span>
      <span className={props?.value === undefined ? "text-danger" : ""}>
        {props?.value === undefined ? " No data " : "  " + props?.value}
      </span>
    </div>
  );
};

export const FileDetails = function (props) {
  return (
    <div className="pb-1">
      <span className="text-primary">{props?.title}:</span>
      <span><a className="text-secondary" href={`${process.env.REACT_APP_BACKEND_URL}/uploads/REF00016d5ed8bc2-044a-4f2b-9df4-274affbbd2b4`} target="_blank"> Read The File</a></span>
    </div>
  );
};

export const ApplicantsDetails = function (props) {
  return (
    <span className="pb-1 pl-3 app-det">
      <span className="text-primary pl-3">{props?.title}:</span>
      <span className={props?.value === undefined ? "text-danger" : "pl-3"}>
        {props?.value === undefined ? " No data " : "  " + props?.value}
      </span>
    </span>
  );
};

export const PageTitle = (props) => {
  return (
    <h5 className="bdf-bluefontcolor-title text-center pt-5">{props?.pagetitle}</h5>
  );
};

export const RequiredStar = () => {
  return <span className="text-danger required-star"> * </span>;
};

export const ResultCard = () => {
  <div className={"alert alert-info text-center pt-3"} role="alert">
    Ntabwo mwemere inkunga kubera mwabonye / You are not allowed grant because
    you received{" "}
  </div>;
};

export const formatDecimals = (val) => {
  let removeChar = val?.replace(/[^0-9.]/g, "");
  let removeDot = removeChar.replace(/\./g, "");
  let formatedNumber = removeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formatedNumber;
};
