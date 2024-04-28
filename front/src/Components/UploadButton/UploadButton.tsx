import React, { useState } from "react";
import {
  OutlineButton,
  OutlineButtonDanger,
  OutlineButtonSubmit,
} from "../../UI/button/button";
import {
  updateBlob,
  updateItem,
  uploadBlob,
  uploadItem,
} from "../../helpers/api";
import type { UploadButtonType } from "./UploadButton.d";

const UploadButton: React.FC<UploadButtonType> = ({
  validateFunction,
  text,
  uploadMethod,
  uploadData,
  uploadUrl,
}) => {
  const [submit, setSubmit] = useState(false);
  const [info, setInfo] = useState({
    className: "",
    message: "",
  });

  const handleValidate = () => {
    let errors = validateFunction();
    if (errors.message) {
      setInfo(errors);
      return;
    } else {
      setInfo({
        className: "",
        message: "",
      });
      setSubmit(true);
    }
  };

  const handleUpload = async () => {
    let response;

    if (uploadMethod === "POST" && uploadData instanceof FormData) {
      response = await uploadBlob(uploadUrl, uploadData);
    }
    if (uploadMethod === "POST" && uploadData instanceof Object) {
      response = await uploadItem(uploadUrl, uploadData);
    }
    if (uploadMethod === "PATCH" && uploadData instanceof FormData) {
      response = await updateBlob(uploadUrl, uploadData);
    }
    if (uploadMethod === "PATCH" && uploadData instanceof Object) {
      response = await updateItem(uploadUrl, uploadData);
    }

    if (response) {
      const data = await response.data;
      if (response.status >= 200 && response.status <= 299) {
        setInfo({
          className: "submit-window mb-3 col-md-5",
          message: data,
        });
      } else {
        setInfo({
          className: "error-window mb-3 col-md-5",
          message: data.message || "Упс, что-то пошло не так!",
        });
      }
    } else {
      setInfo({
        className: "error-window mb-3 col-md-5",
        message: "Кажется что-то пошло не так, это ошибка на нашей стороне!",
      });
    }
    setSubmit(false);
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className={info.className}>
          {info.message.split("\n").map((text, index) => (
            <p key={index} className="text-center mb-0 fw-bold">
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className="row justify-content-center">
        {submit ? (
          <>
            <p className="text-center fw-bold white">Вы уверены?</p>
            <div className="d-flex justify-content-center gap-3">
              <OutlineButtonDanger
                className="col-md-2"
                onClick={() => setSubmit(false)}
              >
                Нет
              </OutlineButtonDanger>
              <OutlineButtonSubmit className="col-md-2" onClick={handleUpload}>
                Да
              </OutlineButtonSubmit>
            </div>
          </>
        ) : (
          <OutlineButton className="col-11" onClick={handleValidate}>
            {text}
          </OutlineButton>
        )}
      </div>
    </>
  );
};

export default UploadButton;
