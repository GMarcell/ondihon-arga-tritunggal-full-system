import React from "react";
import { Outlet } from "react-router-dom";
import LangController from "../LangController";
import { useStateContext } from "../hooks/stateContext";
import { Navigate, useLocation } from "react-router-dom";

function GuestLayout() {
  const { token } = useStateContext();

  const path = useLocation().pathname.split("/").pop();

  if (token) {
    return <Navigate to="/administrator/dashboard" />;
  }

  if (path.includes("sign")) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <LangController>
          <Outlet />
        </LangController>
      </>
    );
  }
}

export default GuestLayout;
