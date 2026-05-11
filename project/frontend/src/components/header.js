import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Header = (props) => {
  const history = useHistory();
  const token = localStorage.getItem("jwt");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  // const token = useSelector((state) => state.auth?.token);
  const userNames = useSelector((state) => state.auth.username);

  useEffect(() => {}, []);

  return (
    <header
      id="header"
      className="header d-flex align-items-center fixed-top bg-bdf-blue"
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <nav id="navbar" className={"navbar text-center d-flex justify-end"}>
          <ul className="text-white ">
            <li className="d-none">BNR</li>
          </ul>
          <div className="flex-column d-show">
            <ul>
              <li className={role === "ROLE_APPLICANT" ? "d-show" : "d-none"}>
                <NavLink to={"/"} className="">
                  Home
                </NavLink>
              </li>
              <li className={role === "ROLE_APPLICANT" ? "d-show" : "d-none"}>
                <NavLink to={"/create-institution"} className="">
                  My Institution
                </NavLink>
              </li>
              <li className={role === "ROLE_APPLICANT" ? "d-show" : "d-none"}>
                <NavLink to={"/create-application"} className="">
                  Application
                </NavLink>
              </li>
              <li className={role !== "ROLE_APPLICANT" ? "d-show" : "d-none"}>
                <NavLink to={"/create-application"} className="">
                  Staff Dashboard
                </NavLink>
              </li>
              <li className={role === "ROLE_REVIEWER" ? "d-show" : "d-none"}>
                <NavLink to={"/reviewing-page"} className="">
                  Review
                </NavLink>
              </li>
              <li className={role === "ROLE_VERIFIER" ? "d-show" : "d-none"}>
                <NavLink to={"/create-application"} className="">
                  Application
                </NavLink>
              </li>
              <li className={role === "ROLE_APPROVER" ? "d-show" : "d-none"}>
                <NavLink to={"/create-application"} className="">
                  Application
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
