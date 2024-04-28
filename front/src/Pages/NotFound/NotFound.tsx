import React from "react";
import Footer from "../../Modules/Footer/Footer";
import Header from "../../Modules/Header/Header";
import Head from "../../Modules/Helmet/Head";
import Main from "../../Modules/Main/Main";
import { MyLinkNS } from "../../UI/link/link";
import { OutlineButton } from "../../UI/button/button";

const NotFound = () => {
  return (
    <div className="wrapper">
      <Head title={"404"} description={"Страница не найдена!"} image="" />
      <Header />
      <Main>
        <section className="not-found d-flex justify-content-center align-items-center bg-img1">
          <div className="not-found__wrapper">
            <div className="container">
              <div className="row flex-row-reverse">
                <div className="col-lg-6 mb-4 mb-lg-0 d-flex flex-column align-items-lg-end align-items-center justify-content-center glassmorphism p-4 b-radius">
                  <h1 className="not-found__title">404 ошибка</h1>
                  <p className="not-found__text white">
                    Такая страница не найдена, вы можете вернуться на главную
                    страницу сайта, либо можете подписаться на наши соц.сети.
                  </p>
                  <MyLinkNS className="not-found__link" to="/">
                    <OutlineButton className="not-found__btn">
                      Вернуться на главную страницу
                    </OutlineButton>
                  </MyLinkNS>
                </div>
                <div className="col-lg-6 d-none d-lg-block"></div>
              </div>
            </div>
          </div>
        </section>
      </Main>
      <Footer />
    </div>
  );
};

export default NotFound;
