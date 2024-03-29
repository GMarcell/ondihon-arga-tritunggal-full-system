import React, { useEffect, useState } from "react";
import { useStateContext } from "../hooks/stateContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import AdminNavbar from "../components/AdminNavbar";
import axiosClient from "../axios-client";
import { isNumeric } from "../utils/CheckIsNumeric";

function AdminLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  const [open, setOpen] = useState(true);

  const currentPath = isNumeric(useLocation().pathname.split("/").pop())
    ? useLocation().pathname.split("/")[
        useLocation().pathname.split("/").length - 2
      ]
    : useLocation().pathname.split("/").pop();

  const onLogout = () => {
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-fit w-full bg-slate-300">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary">
        {/* Main Content */}
        <main
          className={`h-full flex-none transition-all md:pr-2 lg:ml-[293px] bg-white`}
        >
          {/* Routes */}
          <div className="h-fit min-h-screen">
            <AdminNavbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentPath}
              userName={user?.name ?? "-"}
              handleLogout={onLogout}
            />
            <div className="p-3">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
