import "./assets/vendor/bbootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";
import "./assets/vendor/remixicon/remixicon.css";
import "./assets/css/main.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import { PageNotFound } from "./pages/PageNotFound";
import { LoginPage } from "./pages/login";
import CreateAccountPage from "./pages/createaccount";
import ApplicantHome from "./pages/applicanthome";
import CreateInstitutionPage from "./pages/createinstitution";
import CreateApplicationPage from "./pages/createapplication";
import ReviewingPage from "./pages/reviewingpage";
import ViewMoreApplicationDetailsPage from "./pages/viewapplication";

function App() {
  return (
    <>
      <Helmet>
        <title>
          BNR - Licensing Portal 
        </title>
        <meta name="description" content="BNR description" />
        <meta
          name="keywords"
          content="bnr licensing"
        />
        <link rel="icon" href="/logo512.png" />
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage/>
          </Route>
          <Route exact path="/home">
            <HomePage/>
          </Route>
          <Route exact path="/create-account">
            <CreateAccountPage/>
          </Route>
          <Route exact path="/create-institution">
            <CreateInstitutionPage/>
          </Route>
          <Route exact path="/create-application">
            <CreateApplicationPage/>
          </Route>
          <Route exact path="/app-home">
            <ApplicantHome/>
          </Route>
          <Route exact path="/reviewing-page">
            <ReviewingPage/>
          </Route>
          <Route exact path="/view-application/:objectId?">
            <ViewMoreApplicationDetailsPage/>
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
