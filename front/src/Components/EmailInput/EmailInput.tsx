import React, { SetStateAction, useState } from "react";
import { validateEmail } from "../../helpers/inputValidators";

const EmailInput = ({
  email,
  setEmail,
}: {
  email: { email: string; error: boolean };
  setEmail: React.Dispatch<SetStateAction<{ email: string; error: boolean }>>;
}) => {
  const [emailError, setEmailError] = useState({
    formClass: "",
    message: "",
    error: false,
  });

  return (
    <>
      <input
        type="email"
        placeholder="E-mail"
        className={`form-control ${emailError.formClass}`}
        value={email.email}
        onChange={(e) => validateEmail(e, setEmail, setEmailError)}
      />
      <div className="error">{emailError.message}</div>
    </>
  );
};

export default EmailInput;
