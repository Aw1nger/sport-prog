import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../Modules/ScrollToTop/ScrollToTop";
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";
import NotFound from "./NotFound/NotFound";
import RegistrationPage from "./RegistrarionPage/RegistrationPage";
import Voices from "./VoicesPage/Voices";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/voices" element={<Voices />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter; 
