import React, { SetStateAction, useState } from "react";
import { validatePassword } from "../../helpers/inputValidators";

const PasswordInput = ({
  password,
  setPassword,
}: {
  password: {
    value: string;
    error: boolean;
  };
  setPassword: React.Dispatch<
    SetStateAction<{
      value: string;
      error: boolean;
    }>
  >;
}) => {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordError, setPasswordError] = useState({
    formClass: "",
    message: "",
    error: false,
  });
  return (
    <>
      <div className="position-relative">
        <input
          type={passwordType}
          className={`form-control ${passwordError.formClass}`}
          placeholder="Password"
          value={password.value}
          onChange={(e) => validatePassword(e, setPassword, setPasswordError)}
        />
        <img
          src={process.env.PUBLIC_URL + "/image/eyes.svg"}
          alt=""
          className="toggle-password"
          onClick={() => {
            if (passwordType === "password") {
              setPasswordType("text");
            } else {
              setPasswordType("password");
            }
          }}
        />
      </div>
      <div className="error">{passwordError.message}</div>
    </>
  );
};

export default PasswordInput;
