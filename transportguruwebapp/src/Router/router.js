import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from '../Screen/login'
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};
export default Router;
