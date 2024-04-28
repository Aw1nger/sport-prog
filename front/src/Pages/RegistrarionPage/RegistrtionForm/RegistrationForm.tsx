import { InvisibleSmartCaptcha } from "@yandex/smart-captcha";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BirthdayInput from "../../../Components/BirthdayInput/BirthdayInput";
import DropdownInput from "../../../Components/DropdownInput/DropdownInput";
import EmailInput from "../../../Components/EmailInput/EmailInput";
import InputTelMask from "../../../Components/InputTelMask/InputTelMask";
import PasswordInput from "../../../Components/PasswordInput/PasswordInput";
import UsernameInput from "../../../Components/UsernameInput/UsernameInput";
import { Input } from "../../../UI/Input/Input";
import { OutlineButtonWidth } from "../../../UI/button/button";
import { MyLinkWidth } from "../../../UI/link/link";
import { uploadItem } from "../../../helpers/api";
import { setCookie } from "../../../helpers/coockie";

const RegistrationForm = () => {
  const navigate = useNavigate();
  let errors: string = "";
  const [telSubmit, setTelSubmit] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(0);
  const [visible, setVisible] = useState(false);

  const [name, setName] = useState({
    value: "",
    error: false,
  });
  const [lastname, setLastame] = useState({
    value: "",
    error: false,
  });
  const [tel, setTel] = useState({
    value: "",
    error: false,
  });
  const [email, setEmail] = useState({
    email: "",
    error: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
  });
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState({
    value: "",
    error: false,
  });
  const [location, setLocation] = useState("");

  const [telCode, setTelCode] = useState("");

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

    console.log(email);
    console.log(password);
    console.log(name);
    console.log(lastname);
    console.log(tel);
    console.log(gender);
    console.log(birthday);
    console.log(location);

    if (
      !(
        email.email &&
        password.value &&
        name.value &&
        lastname.value &&
        tel &&
        gender &&
        birthday &&
        location
      )
    ) {
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
    if (name.error) {
      errors += "Введите корректное имя.\n";
    }
    if (lastname.error) {
      errors += "Введите корректную фамилию.\n";
    }
    if (tel.error) {
      errors += "Введите корректный телефон.\n";
    }
    if (birthday.error) {
      errors += "Введите корректную дату рождения.\n";
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

  const handleTelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!telCode) {
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

    const formData = {
      phone_number: tel.value,
      verify_code: parseInt(telCode),
    };
    console.log(formData);

    const response = await uploadItem("/api/v1/users/verify_number/", formData);
    const data = await response.data;
    if (response.status >= 200 && response.status < 300) {
      setCookie("token", data.token, 7);
      setCookie("firstname", data.firstname, 7);
      setCookie("lastname", data.lastname, 7);
      navigate("/login");
    } else {
      setError({
        message: "Кажется что-то пошло не так",
        errorClass: "error-window mb-3",
      });
    }
  };

  const handleSetToken = async (token: string) => {
    const formData = {
      first_name: name.value,
      last_name: lastname.value,
      email: email.email,
      phone_number: tel,
      date_of_birth: birthday,
      location,
      gender: gender === "Мужской" ? "М" : "Ж",
      password: password.value,
      smart_token: token,
    };
    console.log(formData);

    const response = await uploadItem("/api/v1/users/", formData);
    const data = await response.data;
    if (response.status >= 200 && response.status < 300) {
      setTelSubmit(true);
    } else {
      setError({
        message: "Кажется что-то пошло не так",
        errorClass: "error-window mb-3",
      });
    }
  };

  return (
    <section className="registration__form  bg-img1  d-flex justify-content-center align-items-center">
      <div className="registration__wrapper">
        <div className="container">
          <form className="form glassmorphism p-4 b-radius" id="login-form">
            {telSubmit ? (
              <>
                <div className="mb-3">
                  <Input
                    value={telCode}
                    setValue={setTelCode}
                    placeholder="Код"
                    className="form-control"
                  />
                </div>

                <div className={`${error.errorClass}`}>
                  {error.message.split("\n").map((text, index) => (
                    <p key={index} className="text-center fw-bold mb-0 white">
                      {text}
                    </p>
                  ))}
                </div>

                <OutlineButtonWidth
                  type="submit"
                  onClick={handleTelSubmit}
                  className="mb-3"
                >
                  Подтвердить
                </OutlineButtonWidth>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <UsernameInput name={name} setName={setName} />
                </div>

                <div className="mb-3">
                  <UsernameInput name={lastname} setName={setLastame} />
                </div>

                <div className="mb-3">
                  <InputTelMask tel={tel} setTel={setTel} />
                </div>

                <div className="mb-3">
                  <EmailInput email={email} setEmail={setEmail} />
                </div>

                <div className="mb-3">
                  <PasswordInput
                    password={password}
                    setPassword={setPassword}
                  />
                </div>

                <div className="mb-3">
                  <BirthdayInput
                    birthday={birthday}
                    setBirthday={setBirthday}
                  />
                </div>

                <div className="mb-3">
                  <Input
                    placeholder="Ваш адресс"
                    className="form-control"
                    value={location}
                    setValue={setLocation}
                  />
                </div>

                <div className="mb-3">
                  <DropdownInput
                    item={gender}
                    setItem={setGender}
                    list={["Мужской", "Женский", "Боевой вертолет К-52"]}
                  />
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

                <MyLinkWidth to="/login" className="mb-3">
                  Войти в аккаунт
                </MyLinkWidth>

                <MyLinkWidth to="/reset_password" className="mb-3">
                  Забыли пароль?
                </MyLinkWidth>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
