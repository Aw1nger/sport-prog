import React from "react";
import "./end.scss";

const End = () => {
  return (
    <section className="end">
      <div className="end__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={process.env.PUBLIC_URL + "/image/end.jpg"}
                alt=""
                className="end__img img-fluid b-radius"
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <p className="end__text accent fw-bold">
                "Ваш голос - ключ к новым трекинговым приключениям!"
              </p>
              <p className="end__text">
                Каждый ваш голос важен! Он не только определяет, какие регионы
                будут исследованы и обустроены для трекинга, но и создает
                возможность для тысяч людей открыть для себя красоту природы в
                самом сердце России.
              </p>
              <p className="end__text">
                Поддержите наш проект голосом и станьте частью трансформации
                пешего туризма в нашей стране. Вместе мы сможем сделать Россию
                еще более привлекательным местом для приключений и открытий.
              </p>
              <p className="end__text">
                Присоединяйтесь к нам и дарите возможность всем наслаждаться
                природой, создавая вместе незабываемые впечатления и
                воспоминания. Вперед, к новым горизонтам!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default End;
