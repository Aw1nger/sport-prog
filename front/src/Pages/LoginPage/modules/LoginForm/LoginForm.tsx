import { InvisibleSmartCaptcha } from "@yandex/smart-captcha";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "../../../../Components/EmailInput/EmailInput";
import PasswordInput from "../../../../Components/PasswordInput/PasswordInput";
import { OutlineButtonWidth } from "../../../../UI/button/button";
import { MyLinkWidth } from "../../../../UI/link/link";
import { uploadItem } from "../../../../helpers/api";
import { setCookie } from "../../../../helpers/coockie";

const LoginForm = () => {
  const navigate = useNavigate();
  let errors: string = "";
  const [resetCaptcha, setResetCaptcha] = useState(0);
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState({
    email: "",
    error: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
  });

  const [error, setError] = useState({
    message: "",
    errorClass: "",
  });

  const handleChallengeHidden = useCallback(() => setVisible(false), []);
  const handleReset = () => {
    setResetCaptcha((prev) => prev + 1);
  };
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleReset();

    if (!(email.email && password.value)) {
      setError({
        message: "Заполните все поля формы!",
        errorClass: "error-window mb-3",
      });
      return;
    } else {
      setError({
        message: "",
        errorClass: "",
      });
    }

    if (email.error) {
      errors += "Введите корректный email.\n";
    }
    if (password.error) {
      errors += "Введите корректный пароль.\n";
    }
    if (errors) {
      setError({
        message: errors,
        errorClass: "error-window mb-3",
      });
      return;
    }

    setVisible(true);
  };
  const handleSetToken = async (token: string) => {
    const formData = {
      email: email.email,
      password: password.value,
      smart_token: token,
    };

    console.log(formData);

    const response = await uploadItem("https://sport-prog.nekto-z.ru/api/v1/users/login/", formData);
    const data = await response.data;
    if (response.status >= 200 && response.status < 300) {
      setCookie("token", data.token, 7);
      setCookie("email", data.email, 7);
      setCookie("firstname", data.first_name, 7);
      setCookie("lastname", data.last_name, 7);
      navigate("/");
    } else {
      setError({
        message: "Кажется что-то пошло не так",
        errorClass: "error-window mb-3",
      });
    }
  };

  return (
    <section className="login ">
      <div className="login__wrapper bg-img1 d-flex justify-content-center align-items-center">
        <form className="form glassmorphism b-radius p-4" id="login-form">
          <div className="mb-3">
            <EmailInput email={email} setEmail={setEmail} />
          </div>

          <div className="mb-3">
            <PasswordInput password={password} setPassword={setPassword} />
          </div>

          <div className={`${error.errorClass}`}>
            {error.message.split("\n").map((text, index) => (
              <p key={index} className="text-center fw-bold mb-0 white">
                {text}
              </p>
            ))}
          </div>

          <InvisibleSmartCaptcha
            key={resetCaptcha}
            sitekey={
              process.env.captcha_key ||
              "ysc1_LiHq5Swos0YZcvb3aLl1S136UP6VytNI0zCRC6ohaa0f6850"
            }
            onSuccess={handleSetToken}
            onChallengeHidden={handleChallengeHidden}
            visible={visible}
          />

          <OutlineButtonWidth
            type="submit"
            onClick={handleLoginSubmit}
            className="mb-3"
          >
            Войти
          </OutlineButtonWidth>

          <MyLinkWidth to="/registration" className="mb-3">
            Создать аккаунт
          </MyLinkWidth>

          <MyLinkWidth to="/reset_password" className="mb-3">
            Забыли пароль?
          </MyLinkWidth>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
