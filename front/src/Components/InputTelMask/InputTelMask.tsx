import React, { SetStateAction, useState } from "react";
import InputMask from "react-input-mask";

const InputTelMask = ({
  tel,
  setTel,
}: {
  tel: { value: string; error: boolean };
  setTel: React.Dispatch<SetStateAction<{ value: string; error: boolean }>>;
}) => {
  const [telError, setTelError] = useState({
    formClass: "",
    message: "",
    error: false,
  });

  const changeHandle = (e: any) => {
    setTel(e.target.value);
    console.log(e.target.value);
    
    if (e.target.value.replace(/\D/g, "").length < 11) {
      setTelError({
        formClass: "invalid",
        message: "Пожалуйста введите номер телефона полностью",
        error: true,
      });
    } else {
      setTelError({
        formClass: "",
        message: "",
        error: false,
      });
    }
  };
  return (
    <>
      <InputMask
        value={tel.value}
        onChange={changeHandle}
        placeholder="Телефон"
        className={`form-control ${telError.formClass}`}
        mask="+7(999)999-99-99"
        maskChar="_"
      />
      <div className="error d-flex justify-content-center">
        {telError.message}
      </div>
    </>
  );
};

export default InputTelMask;
