import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Login from "./Auth/Login";
import Register from './Auth/Register';

const useRoutes = (isLogin) => {
  if (isLogin) {
    return (
      <>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/*" element={<Navigate replace to="/home" />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/*" element={<Navigate replace to="/login" />} />
        </Routes>
      </>
    );
  }
};

export default useRoutes;
