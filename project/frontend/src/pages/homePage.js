import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../components/header";
import { Beadcrumb, PageTitle } from "../components/utils";

function HomePage(){
const CURRENTPAGE = "";
    return (
    <>
      <Header />
      <div className="container">
        <Beadcrumb />
        <PageTitle pagetitle={CURRENTPAGE} />
        <div id="contact">
          <div className="">
            <div className="row pt-3">
              <div className="col-md-6">
                
              </div>
              <div className="col-md-6">
                <h6>LOGIN PAGE </h6>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;