import React from "react";
import Header from "../../Modules/Header/Header";
import Main from "../../Modules/Main/Main";
import Intro from "./Modules/Intro/Intro";
import Footer from "../../Modules/Footer/Footer";
import AboutUs from "./Modules/AdoutUs/AboutUs";
import Voices from "./Modules/Voices/Voices";
import End from "./Modules/End/End";
import Head from "../../Modules/Helmet/Head";

const MainPage = () => {
  return (
    <div className="wrapper">
      <Head title={"Главная"} description={"Главная"} image="" />
      <Header />
      <Main>
        <Intro />
        <AboutUs />
        <Voices />
        <End />
      </Main>
      <Footer />
    </div>
  );
};

export default MainPage;
