import React from "react";
import { Outlet } from "react-router-dom";
import LangController from "../LangController";

function GuestLayout() {
  return (
    <>
      <LangController>
        <Outlet />
      </LangController>
    </>
  );
}

export default GuestLayout;
