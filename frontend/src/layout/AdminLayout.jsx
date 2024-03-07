import React, { useState } from "react";
import { useStateContext } from "../hooks/stateContext";
import { Navigate } from "react-router-dom";
import Sidebar from '../components/sidebar'

function AdminLayout() {
  const { user, token } = useStateContext();
  const [open, setOpen] = useState(true)

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
  <>
    <Sidebar open={open} onClose={() => setOpen(false)} />
    hesa
  </>
  );
}

export default AdminLayout;
