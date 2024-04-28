import React, { SetStateAction, useState } from "react";

const UsernameInput = ({
  name,
  setName,
}: {
  name: { value: string; error: boolean };
  setName: React.Dispatch<SetStateAction<{ value: string; error: boolean }>>;
}) => {
  const [userNameError, setUserNameError] = useState({
    formClass: "",
    message: "",
    error: false,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const isValidName = /^[a-zA-Zа-яА-Я]+$/.test(value) && value.length >= 2;

    if (!isValidName) {
      setUserNameError({
        formClass: "invalid",
        message: "Пожалуйста, введите корректное имя.",
        error: true,
      });
      setName({
        value,
        error: true,
      });
    } else {
      setUserNameError({ formClass: "", message: "", error: false });
      setName({
        value,
        error: false,
      });
    }
  };

  return (
    <>
      <input
        type="text"
        className={`form-control ${userNameError.formClass}`}
        placeholder="Ваше имя"
        value={name.value}
        onChange={handleNameChange}
      />
      <div className="error d-flex justify-content-center">
        {userNameError.message}
      </div>
    </>
  );
};

export default UsernameInput;
