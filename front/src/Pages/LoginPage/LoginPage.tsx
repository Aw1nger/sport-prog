import React from "react";
import Header from "../../Modules/Header/Header";
import Main from "../../Modules/Main/Main";
import Footer from "../../Modules/Footer/Footer";
import LoginForm from "./modules/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="wrapper">
      <Header />
      <Main>
        <LoginForm />
      </Main>
      <Footer />
    </div>
  );
};

export default LoginPage;
