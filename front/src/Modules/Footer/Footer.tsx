import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src={process.env.PUBLIC_URL + '/image/logo.png'} alt="" className="footer__logo" />
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
