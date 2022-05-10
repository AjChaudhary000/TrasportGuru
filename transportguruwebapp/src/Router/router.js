import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from '../Screen/login'
import Otp from '../Screen/otp'

import LoginWithMobile from '../Screen/loginWithMobile'
import Home from "../Screen/Home";
const Router = () => {
  const [token, setToken] = React.useState('')
  React.useEffect(() => {
    setToken(localStorage.getItem("@token"))
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/" element={!token ? <Login /> : <Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginWithMobile" element={<LoginWithMobile />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
};
export default Router;
