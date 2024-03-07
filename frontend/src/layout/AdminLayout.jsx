import React, { useState } from "react";
import { useStateContext } from "../hooks/stateContext";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout() {
  const { user, token } = useStateContext();
  const [open, setOpen] = useState(true);

  if (!token) {
    return <Navigate to="/" />;
  }

  const currentPath = useLocation().pathname.split('/').pop()

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <AdminNavbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentPath}
            />
            {/* <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
