import classnames from "classnames";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { NavLink } from "react-router-dom";
import constants from "./constants";
import { formatDecimals, RequiredStar } from "./utils";
import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { checkValidity } from "./checkValidity";
import { useDispatch, useSelector } from "react-redux";
import { getCriteriaValuesSubs } from "../store/actions";

export const InputText = function (props) {
  return (
    <input
      type="text"
      name={props?.name}
      value={props?.value}
      className="form-control"
      placeholder={props?.placeholder}
      onChange={props?.onChange}
    />
  );
};

export const InputText22nd = function (props) {
  const [valid, setValid] = useState(true);
  const [touched, setTouched] = useState(false);
  let inputClasses = "form-control";
  let errorClasses = "text-danger";
  if (!valid && props.shouldValidate && touched) {
    inputClasses = "form-control border-danger";
    errorClasses = "text-danger";
  }
  let actualValue = false;
  let removeChar;
  let removeDot;
  let formatedNumber;
  let theValue = props?.value;
  let msg = " Irakenewe";
  if (
    (props.value.trim() === "" || props?.value.length === 0) &&
    props.isClicked == true
  ) {
    actualValue = true;
  } else if (
    props?.inptype === "number" &&
    constants.containsOnlyNumbers(props?.value) !== true &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = "  igomba kuba imibare gusa";
  } else if (
    props?.inpvalue === "grant" &&
    props?.value > 130000000 &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = " Ntabwo igomba kurenga Frw 130,000,000";
  } else if (
    props?.inpvalue === "grant" &&
    props?.value > props?.totalinvestment &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = ` ${props?.value} Ntabwo igomba kuruta Total investment/Ingano y’igishoro ${props?.totalinvestment}`;
  }

  if (props?.inptype === "number") {
    removeChar = props?.value?.replace(/[^0-9.]/g, "");
    removeDot = removeChar.replace(/\./g, "");
    formatedNumber = removeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    theValue = formatedNumber;
  }

  useEffect(() => {}, [valid, touched]);

  const onChangeHandler = (event) => {
    let value;
    if (event.target) {
      value = event.target.value;
    } else {
      value = event;
    }
    props.changed(value);
    if (props.shouldValidate) {
      try {
        setTouched(true);
        //--
        if (props.isSubmitted === true && value === "") {
          setTouched(true);
        }
      } catch (err) {}
      //---
      try {
        props.load_modules(value);
      } catch (error) {}
      //--
      try {
        props.loadNewSubjectunits(value);
      } catch (error) {}

      try {
        props.getMultiselectedUnits(value);
      } catch (error) {}
    }
  };

  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="text"
        name={props.name}
        className={inputClasses}
        placeholder={props?.placeholder}
        onChange={onChangeHandler}
        value={props.value}
        onClick={props.inputClicked}
      />
      <span className={errorClasses}>
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputText2 = function (props) {
  const [valid, setValid] = useState(true);
  const [touched, setTouched] = useState(false);
  let actualValue = false;
  let theValue = props?.value;

  let msg = " is required";

  const onChangeHandler = (value) => {
    props.onChange(value);
    try {
      setTouched(true);
    } catch (error) {}
  };
  if (props?.isClicked === true && props?.value?.toString().trim() === "") {
    actualValue = true;
  }

  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="text"
        name={props.name}
        value={theValue}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        onClick={onChangeHandler}
      />
      <span className="text-danger">
        {actualValue === true ? props?.title + msg : ""}
      </span>
    </div>
  );
};

export const InputTextSearch = function (props) {
  const [valid, setValid] = useState(true);
  const [touched, setTouched] = useState(false);
  let actualValue = false;
  let removeChar;
  let removeDot;
  let formatedNumber;
  let theValue = props?.value;
  let actnumber = "";
  let ti = props?.totalinvestment;

  if (props?.inptype === "number") {
    removeChar = props?.value?.replace(/[^0-9.]/g, "");
    removeDot = removeChar.replace(/\./g, "");
    formatedNumber = removeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    theValue = formatedNumber;
    actnumber = removeDot;
  }

  if (props?.totalinvestment && props?.inpvalue === "grant") {
    let remeChar = props?.totalinvestment?.replace(/[^0-9.]/g, "");
    ti = Number(remeChar.replace(/\./g, ""));
  }

  let msg = " Irakenewe";

  const onChangeHandler = (value) => {
    props.onChange(value);
    try {
      setTouched(true);
    } catch (error) {}
  };

  if (props?.isClicked === true && props?.value?.trim() === "") {
    actualValue = true;
  } else if (
    props?.inptype === "number" &&
    constants.containsOnlyNumbers(actnumber) !== true &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = "  igomba kuba imibare gusa";
  } else if (
    props?.inpvalue === "grant" &&
    actnumber > 130000000 &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = " Ntabwo igomba kurenga Frw 130,000,000";
  }

  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <input
        type="text"
        name={props.name}
        value={theValue}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        onClick={onChangeHandler}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputTextOC = function (props) {
  const [valid, setValid] = useState(true);
  const [touched, setTouched] = useState(false);
  let actualValue = false;
  let removeChar;
  let removeDot;
  let formatedNumber;
  let theValue = props?.value;
  let actnumber = "";
  let ti = props?.totalinvestment;
  if (props?.totalinvestment) {
    let remeChar = props?.value?.replace(/[^0-9.]/g, "");
    ti = remeChar.replace(/\./g, "");
  }

  if (props?.inptype === "number") {
    removeChar = props?.value?.replace(/[^0-9.]/g, "");
    removeDot = removeChar.replace(/\./g, "");
    formatedNumber = removeDot.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    theValue = formatedNumber;
    actnumber = removeDot;
  }

  let msg = " Irakenewe";
  if (props.value.trim() === "" && props.isClicked == true) {
    actualValue = true;
  } else if (
    props?.inptype === "number" &&
    constants.containsOnlyNumbers(actnumber) !== true &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = "  igomba kuba imibare gusa";
  } else if (
    props?.inpvalue === "grant" &&
    actnumber > 130000000 &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = " Ntabwo igomba kurenga Frw 130,000,000";
  } else if (
    props?.inpvalue === "grant" &&
    actnumber > ti &&
    props.isClicked === true
  ) {
    actualValue = true;
    msg = ` ${theValue} Frw, ntigomba kuruta ingano y’igishoro ${formatDecimals(
      props?.totalinvestment,
    )}`;
  }

  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="text"
        name={props.name}
        value={theValue}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputNationalId = function (props) {
  let actualValue = false;
  let msg = " Irakenewe";
  let theValue = props?.value;
  let removeChar = props?.value?.replace(/[^0-9.]/g, "");
  let removeDot = removeChar?.replace(/\./g, "");
  let formatedNumber = removeDot?.replace(/\B((?!\d))/g, "");
  theValue = formatedNumber;
  let actnumber = removeDot;

  if (
    props.value !== undefined &&
    props?.value?.trim() === "" &&
    props.isClicked == true
  ) {
    actualValue = true;
  } else if (
    props.value !== undefined &&
    (constants.containsOnlyNumbers(props?.value) !== true ||
      props.value.length !== 16) &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = " must be 16 digits";
  } else if (props?.unique === "true") {
    actualValue = true;
    msg = " " + props.value + " has been used";
  }
  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="text"
        name={props.name}
        value={theValue}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputTIN = function (props) {
  let actualValue = false;
  let msg = " is required";
  if (props.value.trim() === "" && props.isClicked == true) {
    actualValue = true;
  } else if (
    props?.type === "tin" &&
    (constants.containsOnlyNumbers(props?.value) !== true ||
      props.value.length !== 9) &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = " must be 9 numbers";
  } else if (props?.unique === "true") {
    actualValue = true;
    msg = " " + props.value + " has been used";
  }
  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="text"
        name={props.name}
        value={props.value}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputTINForJV = function (props) {
  let actualValue = false;
  let msg = " Irakenewe";
  // if (props.value.trim() === "" && props.isClicked == true) {
  //   actualValue = true;
  // } else

  if (
    props?.type === "tin" &&
    props?.value?.trim() !== "" &&
    (constants.containsOnlyNumbers(props?.value) !== true ||
      props.value.length !== 9) &&
    props.isClicked === true
  ) {
    actualValue = true;
    msg = " igomba kuba imibare 9 gusa";
  } else if (
    props?.type === "rca" &&
    constants.validateRCANo(props?.value) !== true &&
    props.isClicked === true
  ) {
    actualValue = true;
    msg = ` igomba igomba iteye gutya RCA/xxxx/xxxx`;
  } else if (props?.unique === "true") {
    actualValue = true;
    msg = " " + props.value + " yarakoreshejwe";
  }
  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <input
        type="text"
        name={props.name}
        value={props.value}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputPassport = function (props) {
  let actualValue = false;
  let msg = " Irakenewe";
  if (
    props.value !== undefined &&
    props.value.trim() === "" &&
    props.isClicked == true
  ) {
    actualValue = true;
  } else if (
    props.value !== undefined &&
    props.value.length < 6 &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = " igomba kuba inyuguti cyangwa imibare byibuze 6";
  } else if (props?.unique === "true" && props.isClicked == true) {
    actualValue = true;
    msg = " " + props.value + " yarakoreshejwe";
  }
  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="text"
        name={props.name}
        value={props.value}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputTelephone = function (props) {
  let actualValue = false;
  let theValue = props?.value;
  let msg = " Irakenewe";
  let removeChar = props?.value?.replace(/[^0-9.]/g, "");
  let removeDot = removeChar.replace(/\./g, "");
  let formatedNumber = removeDot.replace(/\B((?!\d))/g, "");
  theValue = formatedNumber;
  let actnumber = removeDot;

  if (props.value.trim() === "" && props.isClicked == true) {
    actualValue = true;
  } else if (
    (props?.value?.slice(0, 2) !== "07" ||
      constants.containsOnlyNumbers(props?.value) !== true ||
      props.value.length !== 10) &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = " igomba kuba imibare 10 gusa. format 07xxxxxxxx";
  } else if (props?.unique === "true") {
    actualValue = true;
    msg = " " + props.value + " yarakoreshejwe";
  }
  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title} (ex: 0788888888)</span>
      <RequiredStar />
      <input
        type="text"
        name={props.name}
        value={theValue}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputEmail = function (props) {
  const [valid, setValid] = useState(true);
  const [touched, setTouched] = useState(false);
  let actualValue = false;
  let msg = " Irakenewe";
  if (props.value.trim() === "" && props.isClicked == true) {
    actualValue = true;
  } else if (
    props?.value !== "" &&
    constants.validateEmail(props?.value) !== true &&
    props.isClicked == true
  ) {
    actualValue = true;
    msg = " igomba kuzuza ibisabwa";
  } else if (props?.unique === "true") {
    actualValue = true;
    msg = " " + props.value + " yarakoreshejwe";
  }
  return (
    <div className="w-100">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="text"
        name={props.name}
        value={props.value}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + msg : ""}
      </span>
    </div>
  );
};

export const InputTextSecret2 = function (props) {
  let actualValue = false;
  if (
    props.value.trim() === "" ||
    (props?.value.length === 0 && props.isClicked == true)
  ) {
    actualValue = true;
  }
  return (
    <div className="">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="password"
        name={props.name}
        value={props.value}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + " Is Required" : ""}
      </span>
    </div>
  );
};

export const SelectInput = function (props) {
  let actualValue = false;
  if (props.value == "" && props.isClicked == true) {
    actualValue = true;
  }
  const onChangeHandler = (event) => {
    let value;
    if (event.target) {
      value = event.target.value;
    } else {
      value = event;
    }
    props.changed(value);
  };
  return (
    <div className="">
      <span className="bdf-bluefontcolor">{props?.title}</span>
      <RequiredStar />
      <select
        id={props?.id}
        className={classnames("w-full form-control", {
          "w-full form-control border-danger": actualValue,
        })}
        value={props.value}
        onChange={onChangeHandler}
      >
        <option>{props?.startingValue}</option>
        {(
          props?.elementConfig?.hasOwnProperty("optionsType")
            ? props?.elementConfig?.optionsType === "minimal"
            : false
        )
          ? props?.elementConfig?.options?.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))
          : props?.options.map((option, index) => (
              <option value={option.uuid || option.value} key={index}>
                {option.name || option.value}
              </option>
            ))}
      </select>
      <span className="text-danger">
        {actualValue === true ? props.title + " is required" : ""}
      </span>
    </div>
  );
};

export const InputDate = function (props) {
  let actualValue = false;
  let msg = props.title + " Irakenewe";
  if (props.value == "" && props.isClicked == true) {
    actualValue = true;
  }
  var date = new Date();
  var thedate = new Date(props?.value);
  const newDate = date.getTime() - thedate.getTime();
  const years = Math.floor(newDate / (1000 * 60 * 60 * 24) / 365);
  if (props?.datetype == "dob") {
    const years = Math.floor(newDate / (1000 * 60 * 60 * 24));
  }

  date.setDate(date.getDate());
  if (thedate.getTime() < date.getTime()) {
    actualValue = true;
    msg = props.title + " Can not be in the past";
  }
  return (
    <div className="d-none">
      <span className="bdf-bluefontcolor">{props.title}</span>
      <RequiredStar />
      <input
        type="date"
        min={new Date()}
        max={new Date()}
        name={props.name}
        value={props.value}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">{actualValue === true ? msg : ""}</span>
    </div>
  );
};

export const UplodadFile11 = function (props) {
  let accept = ".pdf";
  let classes = "";
  let required = props.required;
  let actualValue = false;

  if (
    props.isClicked == true &&
    props?.fileError !== undefined &&
    props?.fileError == true
  ) {
    actualValue = true;
  }

  if (props?.accept) {
    accept = props?.accept;
  }

  if (props.updating == constants.isTrue) {
    classes = "d-none";
    required = false;
  }

  return (
    <div className={classes}>
      <span className="bdf-bluefontcolor">{props.title}</span>
      <input
        required={required}
        type="file"
        name={props.name}
        accept={accept}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + " Is Required" : ""}
      </span>
    </div>
  );
};

export const UplodadFile = function (props) {
  let accept = ".pdf";
  let classes = "";
  let required = props.required;
  let actualValue = false;
  if (props.value == "" && props.isClicked == true) {
    actualValue = true;
  }

  if (props?.accept) {
    accept = props?.accept;
  }

  if (props.updating == constants.isTrue) {
    classes = "d-show";
    required = false;
  }

  return (
    <div className={classes}>
      <span className="bdf-bluefontcolor">{props.title}</span>
      <input
        required={required}
        type="file"
        name={props.name}
        accept={accept}
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <span className="text-danger">
        {actualValue === true ? props.title + " Is Required" : ""}
      </span>
    </div>
  );
};

export const InputTextArea = function (props) {
  let actualValue = false;
  let rowsValue = 7 + props?.rowsNbr;
  if (props.value == "" && props.isClicked == true) {
    actualValue = true;
  }

  return (
    <div className="">
      <span className="bdf-bluefontcolor">{props?.title}</span>
      <RequiredStar />
      <textarea
        className={classnames("form-control", {
          "form-control border-danger": actualValue,
        })}
        name={props?.name}
        value={props?.value}
        rows={rowsValue}
        placeholder={props?.placeholder}
        onChange={props?.onChange}
      ></textarea>
      <span className="text-danger">
        {actualValue === true ? props.title + " Is Required" : ""}
      </span>
    </div>
  );
};

export const SelectRadioButton = (props) => {
  let actualValue = false;
  if (props.value === "" && props.isClicked == true) {
    actualValue = true;
  }
  return (
    <div className="">
      <label className="bdf-bluefontcolor">{props.title} </label>
      <div className="d-flex row" onChange={props.onChange}>
        <div className="w-50">
          <input
            type="radio"
            value={props.option1}
            id="true"
            name={props.name}
          />
          <label for="true" className="px-2">
            {props.option1text}
          </label>
        </div>
        <div className="w-50">
          <input
            type="radio"
            value={props.option2}
            id="false"
            name={props.name}
          />
          <label for="false" className="px-2">
            {props.option2text}
          </label>
        </div>
      </div>
      <span className="text-danger">
        {actualValue === true ? "Select One Option" : ""}
      </span>
    </div>
  );
};

export const CheckBoxButton = (props) => {
  let actualValue = false;
  if (props.value === "" && props.isClicked == true) {
    actualValue = true;
  }
  // (props?.boxerror!==1 && props.isClicked === true)
  return (
    <div className="">
      <div className="" onChange={props.onChange}>
        <div className="row">
          <label
            className={
              1 == 1 ? "text-danger col-md-10" : "bdf-bluefontcolor col-md-10"
            }
          >
            {props.title}{" "}
          </label>
          <input
            className="col-sm-1"
            id={props?.idd}
            type="checkbox"
            //   value={acceppted}
            //   onChange={() => changeHandler(!acceppted)}
          />
        </div>
      </div>
    </div>
  );
};

export const SubmitButton = function (props) {
  let classes = props?.classes;
  return (
    <button
      disabled={props?.disabled}
      onClick={props?.onSubmit}
      type="submit"
      className={"col " + classes}
    >
      {props.action}
    </button>
  );
};

export const ActivateButton = function (props) {
  let classes = "d-none";
  let title = "";
  if (props?.status) {
    if (props?.status === "active") {
      classes = "d-show btn btn-danger";
      title = "Desactivate";
    } else {
      classes = "d-show btn btn-success";
      title = "Activate";
    }
  }
  return (
    <button
      disabled={props?.disabled}
      onClick={props?.onSubmit}
      type="submit"
      className={"col " + classes}
    >
      {title}
    </button>
  );
};

export const PageLink = function (props) {
  return (
    <NavLink
      to={props?.page}
      className="bg-bdf-blue px-5 py-2 text-white font-bold"
    >
      {props?.title}
    </NavLink>
  );
};

export const InputTextSecret = function (props) {
  return (
    <input
      type="password"
      name={props?.name}
      value={props?.value}
      className="form-control"
      placeholder={props?.placeholder}
      onChange={props?.onChange}
    />
  );
};

export const EditButton = function (props) {
  let classes = props?.classes;
  let idpath = props?.id;
  if (props?.parentId) {
    idpath = props?.parentId + "/" + props?.id;
  }
  return (
    <NavLink
      to={props?.page + "/" + idpath}
      className="bg-bdf-blue py-1 px-2 text-white w-auto"
    >
      {props?.title}
    </NavLink>
  );
};

export const ViewContentBtn = function (props) {
  let classes = props?.classes;
  let idpath = props?.id;
  if (props?.parentId) {
    idpath = props?.parentId + "/" + props?.id;
  }
  return (
    <NavLink
      to={props?.page + "/" + idpath}
      className="bg-success py-1 px-2 text-white w-auto"
    >
      {props?.title}
    </NavLink>
  );
};

export const ViewButton = function (props) {
  let classes = "py-1 px-2 text-white w-50 bg-success w-auto m-3 border-0";
  if (props?.actiontype == "approve") {
    classes = "py-1 px-2 text-white w-50 bg-success w-auto m-2 border-0";
  } else if (props?.actiontype == "request") {
    classes = "py-1 px-2 text-white w-50 bg-info w-auto m-2 border-0";
  } else if (props?.actiontype == "reject") {
    classes = "py-1 px-2 text-white w-50 bg-danger w-auto m-2 border-0";
  }
  return (
    <button type="submit" onClick={props.onClick} className={classes}>
      {props?.title}
    </button>
  );
};

export const MiniTitle = function (props) {
  return (
    <label className="bdf-bluefontcolor-title-2 p-2">{props?.title}</label>
  );
};
