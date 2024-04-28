import React, { SetStateAction, useState } from "react";
import InputMask from "react-input-mask";

const BirthdayInput = ({
  birthday,
  setBirthday,
}: {
  birthday: { value: string; error: boolean };
  setBirthday: React.Dispatch<
    SetStateAction<{ value: string; error: boolean }>
  >;
}) => {
  const [stateError, setStateError] = useState({
    formClass: "",
    message: "",
    error: false,
  });

  const changeHandle = (e: any) => {
    setBirthday(e.target.value);
    if (e.target.value.replace(/\D/g, "").length < 8) {
      setStateError({
        formClass: "invalid",
        message: "Пожалуйста введите день рождения полностью",
        error: true,
      });
    } else {
      setStateError({
        formClass: "",
        message: "",
        error: false,
      });
    }
  };

  return (
    <>
      <InputMask
        type="text"
        value={birthday.value}
        onChange={changeHandle}
        placeholder="День рождения"
        className={`form-control ${stateError.formClass}`}
        mask="9999-99-99"
      />
      <div className="error">{stateError.message}</div>
    </>
  );
};

export default BirthdayInput;
