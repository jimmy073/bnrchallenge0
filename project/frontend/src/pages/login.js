import * as actions from "../store/actions/";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/header";
import { InputText, InputTextSecret } from "../components/inputs";

export const LoginPage = function (props) {
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const error = useSelector((state) => state.auth.error);

  const login = (e) => {
    e.preventDefault();
    dispatch(actions.login(username, password));
  };

  const history = useHistory();
  useEffect(() => {
    if (user !== null && role === "ROLE_APPLICANT") {
      history.push("/app-home");
    } else if (user !== null && role === "ROLE_REVIEWER") {
      history.push("/reviewing-page");
    }else if (user !== null && role === "ROLE_VERIFIER") {
      history.push("/reviewing-page");
    }else if (user !== null && role === "ROLE_APPROVER") {
      history.push("/reviewing-page");
    }else if (user !== null && role === "ROLE_ADMIN") {
      history.push("/reviewing-page");
    }
  }, [user]);
  return (
    <div className="">
      <Header />
      <main id="main">
        <div className="breadcrumbs-modified d-flex align-items-center"></div>
        <section id="contact" className="input-data">
          <div className="container position-relative" data-aos="fade-up">
            <div className="row gy-4 d-flex justify-content-end">
              <div
                className="col-lg-5"
                data-aos="fade-up"
                data-aos-delay="100"
              ></div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="250">
                <form className="php-email-form">
                  <div className="mt-5">
                    <div className="padding-fifty">
                      <span className="bdf-bluefontcolor">
                        Sign In to Use the System
                      </span>
                    </div>
                    <div className="col-md-6 form-group py-3">
                      <InputText
                        title={"Username"}
                        placeholder="Username"
                        value={username}
                        name="username"
                        onChange={(e) => setusername(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group ">
                      <InputTextSecret
                        title={"Password"}
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                    <span className={error ? "py-3 text-danger" : "d-none"}>
                      {"Username/Password Incorrect"}
                    </span>
                    <div className="">
                      <button onClick={login} type="submit">
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
