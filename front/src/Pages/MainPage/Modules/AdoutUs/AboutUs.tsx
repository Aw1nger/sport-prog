import React from "react";
import "./about-us.scss";

const AboutUs = () => {
  return (
    <section className="aboutUs">
      <div className="aboutUs__wrapper glassmorphism-bgimg">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="aboutUs__title">О нас</h2>
              <p className="aboutUs__text">
                Мы - команда <span className="primary fw-bold">энтузиастов</span>,
                которые разделяют страсть к приключениям и любовь к природе.
                Наша миссия - сделать трекинг доступным для каждого, кто мечтает
                о путешествиях под открытым небом.
              </p>
              <p className="aboutUs__text">
                Вдохновленные популярной мировой практикой трекинга, мы
                стремимся развивать это направление туризма в России. Мы верим в
                то, что каждый человек должен иметь возможность исследовать
                удивительные места и создавать незабываемые воспоминания.
              </p>

              <p className="aboutUs__text">
                <span className="primary fw-bold">
                  Наша команда работает над созданием структурированных
                  маршрутов
                </span>
                , обеспечивая безопасность и комфорт каждого путешественника. Мы
                исследуем регионы, прокладываем тропы и создаем условия для
                незабываемых приключений в окружении красоты природы.
              </p>

              <p className="aboutUs__text">
                Присоединяйтесь к нам в этом увлекательном путешествии! Вместе
                мы сможем открыть новые горизонты и оставить след в истории
                российского трекинга.
              </p>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img
                src={process.env.PUBLIC_URL + "/image/aboutUs_img.jpg"}
                alt=""
                className="aboutUs__img img-fluid b-radius"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
