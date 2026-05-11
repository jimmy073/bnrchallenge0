import Header from "../components/header";

export const PageNotFound = function (props) {
  return (
    <body className="page-contact">
      <Header />
      <main id="main">
        <div className="breadcrumbs d-flex align-items-center contactus-hd-pg">
          <div className="container position-relative d-flex flex-column align-items-center">
            <h2>Page Not Found</h2>
          </div>
        </div>{" "}
        <section id="contact" className="contact">
          <div className="container position-relative" data-aos="fade-up">
            <div className="row gy-4 d-flex justify-content-end">
              <div
                className="col-lg-5"
                data-aos="fade-up"
                data-aos-delay="100"
              ></div>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
};