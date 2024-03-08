import React, { useState } from "react";
import { useStateContext } from "../hooks/stateContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

function AdminLayout() {
  const { user, token } = useStateContext();
  const [open, setOpen] = useState(true);

  if (!token) {
    return <Navigate to="/" />;
  }

  const currentPath = useLocation().pathname.split('/').pop()

  return (
    <div className="flex h-full w-full bg-slate-300">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary">
        {/* Main Content */}
        <main
          className={`h-full flex-none transition-all md:pr-2 lg:ml-[293px] bg-white`}
        >
          {/* Routes */}
          <div className="h-svh">
            <AdminNavbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentPath}
            />
            <div className="p-3">
            <Outlet/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
