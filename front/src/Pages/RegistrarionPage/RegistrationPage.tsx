import React from "react";
import Header from "../../Modules/Header/Header";
import Main from "../../Modules/Main/Main";
import Footer from "../../Modules/Footer/Footer";
import RegistrationForm from "./RegistrtionForm/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <Main>
        <RegistrationForm />
      </Main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
