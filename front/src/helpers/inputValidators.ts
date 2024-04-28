import React, { SetStateAction } from "react";

export const validateEmail = (
  e: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<SetStateAction<{ email: string; error: boolean }>>,
  setEmailError: React.Dispatch<
    SetStateAction<{ formClass: string; message: string; error: boolean }>
  >
) => {
  const value = e.target.value;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = emailPattern.test(value);

  if (!isValidEmail) {
    setEmailError({
      formClass: "invalid",
      message: "Пожалуйста, введите правильный email.",
      error: true,
    });
    setEmail({
      email: value,
      error: true,
    });
  } else {
    setEmailError({ formClass: "", message: "", error: false });
    setEmail({
      email: value,
      error: false,
    });
  }
};

export const validatePassword = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPassword: React.Dispatch<
    SetStateAction<{
      value: string;
      error: boolean;
    }>
  >,
  setPasswordError: React.Dispatch<
    SetStateAction<{
      formClass: string;
      message: string;
      error: boolean;
    }>
  >
) => {
  const value = e.target.value;
  if (value.length < 6) {
    setPasswordError({
      formClass: "invalid",
      message: "Колличество символов должно быть не меньше 6",
      error: true,
    });
    setPassword({
      value,
      error: true,
    });
  } else {
    setPasswordError({
      formClass: "",
      message: "",
      error: false,
    });
    setPassword({
      value,
      error: false,
    });
  }
};
