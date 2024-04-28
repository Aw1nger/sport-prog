import React from "react";
import "./intro.scss";
import { OutlineButton } from "../../../../UI/button/button";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <section className="intro">
      <div className="intro__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="intro__textbox glassmorphism b-radius p-5">
                <h1 className="intro__title mb-4">
                  Добро пожаловать в мир трекинга в России!
                </h1>
                <OutlineButton onClick={() => navigate("/voices")}>
                  Проголосовать за маршрут
                </OutlineButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
