import React, { useEffect, useState } from "react";
import DropdownInput from "../../../Components/DropdownInput/DropdownInput";
import UploadButton from "../../../Components/UploadButton/UploadButton";
import { getCookieValue } from "../../../helpers/coockie";
import "./voices-form.scss";

const VoicesForm = () => {
  const districtsObj = {
    ЦФО: [
      "Московская область",
      "Орловская область",
      "Тверская область",
      "Смоленская область",
      "Ярославская область",
      "Ивановская область",
      "Костромская область",
      "Калужская область",
      "Тульская область",
      "Брянская область",
      "Рязанская область",
    ],
    СЗФО: [
      "Санкт-Петербург",
      "Ленинградская область",
      "Псковская область",
      "Мурманская область",
      "Карелия",
      "Архангельская область",
      "Ненецкий автономный округ",
    ],
    ЮФО: [
      "Краснодарский край",
      "Ставропольский край",
      "Ростовская область",
      "Адыгея",
      "Астраханская область",
      "Волгоградская область",
    ],
    ПФО: [
      "Кировская область",
      "Нижегородская область",
      "Оренбургская область",
      "Пензенская область",
      "Пермский край",
      "Самарская область",
      "Саратовская область",
      "Удмуртская Республика",
      "Ульяновская область",
      "Чувашия",
    ],
    СКФО: [
      "Краснодарский край",
      "Республика Адыгея",
      "Карачаево-Черкесская Республика",
      "Республика Ингушетия",
      "Республика Кабардино-Балкария",
      "Республика Северная Осетия - Алания",
      "Ставропольский край",
      "Чеченская Республика",
    ],
    УрФО: [
      "Свердловская область",
      "Тюменская область",
      "Ханты-Мансийский автономный округ",
      "Ямало-Ненецкий автономный округ",
      "Челябинская область",
      "Курганская область",
      "Тюменская область",
    ],
    ДФО: [
      "Хабаровский край",
      "Приморский край",
      "Амурская область",
      "Магаданская область",
      "Сахалинская область",
      "Еврейская автономная область",
      "Чукотский автономный округ",
      "Камчатский край",
    ],
    СФО: [
      "Республика Алтай",
      "Республика Тыва",
      "Республика Хакасия",
      "Алтайский край",
      "Красноярский край",
      "Иркутская область",
      "Кемеровская область",
      "Новосибирская область",
      "Омская область",
      "Томская область",
    ],
  };

  const [formData, setFormData] = useState({
    district: "",
    region: "",
    token: getCookieValue("token"),
  });
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    setFormData({
      district,
      region,
      token: getCookieValue("token"),
    });
  }, [district, region]);

  const validate = () => {
    if (formData.district && formData.region) {
      return {
        className: "",
        message: "",
      };
    } else {
      return {
        className: "error-window mb-3",
        message: "Пожалуйста заполните все поля!",
      };
    }
  };

  return (
    <section className="voicesForm ">
      <div className="voicesForm__wrapper">
        <div className="container">
          <form className="voicesForm__form">
            <div className="row justify-content-center">
              <div className="col-md-5  glassmorphism b-radius p-4">
                <div className="mb-3">
                  <p className="voicesForm__text white mb-1">Выберете округ</p>
                  <DropdownInput
                    item={district}
                    setItem={setDistrict}
                    list={Object.keys(districtsObj)}
                  />
                </div>
                {district ? (
                  <div className="mb-3">
                    <p className="voicesForm__text white mb-1">
                      Выберете регион
                    </p>
                    <DropdownInput
                      item={region}
                      setItem={setRegion}
                      // @ts-ignore
                      list={districtsObj[district]}
                    />
                  </div>
                ) : null}
                {region ? (
                  <div className="mb-3">
                    <UploadButton
                      text={"Проголосовать"}
                      validateFunction={validate}
                      uploadMethod={"PATCH"}
                      uploadData={formData}
                      uploadDataFormat={"JSON"}
                      uploadUrl={"api/v1/voices/voice/"}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VoicesForm;
