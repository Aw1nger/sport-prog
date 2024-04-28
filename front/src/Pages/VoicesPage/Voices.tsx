import React from "react";
import Footer from "../../Modules/Footer/Footer";
import Header from "../../Modules/Header/Header";
import Main from "../../Modules/Main/Main";
import VoicesForm from "./Modules/VoicesForm";

const Voices = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (getCookieValue("token") !== undefined) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="wrapper ">
      <Header />
      <Main>
        <VoicesForm />
      </Main>
      <Footer />
    </div>
  );
};

export default Voices;
