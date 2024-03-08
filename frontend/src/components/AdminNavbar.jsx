import React from "react";
import Dropdown from "../components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import avatar from "../assets/img/avatars/mainAvatar.jpg";

const AdminNavbar = (props) => {
  const { onOpenSidenav, brandText } = props;

  return (
    <nav className="top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl p-2">
      <span
        className="flex cursor-pointer text-3xl text-gray-600 lg:hidden"
        onClick={onOpenSidenav}
      >
        <FiAlignJustify className="h-8 w-8" />
      </span>
      <div className="ml-[6px]">
        <p className="shrink text-[33px] font-bold capitalize text-black">
          {brandText}
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] flex-grow items-center justify-around gap-2 rounded-full px-2 py-2 shadow-shadow-500 md:flex-grow-0 md:gap-1 xl:gap-2">
        {/* Profile & Dropdown */}
        <Dropdown
          classNames={"py-2 top-8 -left-[180px] w-max"}
          button={
            <img
              className="h-12 w-12 rounded-full"
              src={avatar}
              alt="Elon Musk"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500">
              <div className="flex flex-col p-4">
                <a
                  href=" "
                  className="mt-3 text-md font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
        />
      </div>
    </nav>
  );
};

export default AdminNavbar;
