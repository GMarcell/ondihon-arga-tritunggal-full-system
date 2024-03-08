import React from "react";
import { Outlet } from "react-router-dom";
import LangController from "../LangController";
import { useStateContext } from "../hooks/stateContext";
import { Navigate } from "react-router-dom";

function GuestLayout() {
  const {token} = useStateContext()

  // if (token){
  //   return <Navigate to='/administrator/dashboard'/>
  // }

  return (
    <>
      <LangController>
        <Outlet />
      </LangController>
    </>
  );
}

export default GuestLayout;
