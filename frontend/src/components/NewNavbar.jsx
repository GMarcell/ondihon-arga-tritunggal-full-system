import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import NavItem from "./sub/Navitems";
import { NAV_MENU_EN, NAV_MENU_ID } from "../constants";

export default function NewNavbar({ lang, setLang }) {
  const [openNav, setOpenNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavMenu = lang == "id" ? NAV_MENU_ID : NAV_MENU_EN;

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar
      placeholder=""
      fullWidth
      className="mx-auto px-4 py-2 lg:px-8 lg:py-4 "
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center justify-center gap-2">
          <img src="/image/navbar/LogoOAT.png" alt="Logo" width={100} />
          <img
            src="/image/navbar/Authorised-distributor-horizontal-logo-English-Original.png"
            alt="Logo"
            width={120}
          />
        </div>
        <div className="hidden lg:block">
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 list-none">
            {NavMenu.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
            {/* =========== dropdown menu ============= */}
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
              <MenuHandler>
                <Typography
                  placeholder=""
                  as="a"
                  href="#"
                  variant="small"
                  className="font-normal"
                  color="black"
                >
                  <MenuItem
                    placeholder=""
                    className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full"
                  >
                    {lang == "id" ? "Indonesia" : "English"}
                    <ChevronDownIcon
                      strokeWidth={2}
                      className={`h-3 w-3 transition-transform ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </MenuItem>
                </Typography>
              </MenuHandler>
              <MenuList
                placeholder=""
                className=" gap-3 overflow-visible grid !border-none"
              >
                <MenuItem
                  placeholder=""
                  className={`hover:bg-slate-500 ${
                    lang == "id" ? "bg-[#646EE4]" : ""
                  }`}
                  disabled={lang == "id"}
                  onClick={() => setLang("id")}
                >
                  <Typography
                    placeholder=""
                    variant="h6"
                    color="black"
                    className="mb-1"
                  >
                    Indonesia
                  </Typography>
                </MenuItem>
                <MenuItem
                  placeholder=""
                  className={`hover:bg-slate-500 ${
                    lang == "en" ? "bg-[#646EE4]" : ""
                  }`}
                  disabled={lang == "en"}
                  onClick={() => setLang("en")}
                >
                  <Typography
                    placeholder=""
                    variant="h6"
                    color="black"
                    className="mb-1"
                  >
                    English
                  </Typography>
                </MenuItem>
                {/* <ul className="col flex w-full flex-col gap-1">
                </ul> */}
              </MenuList>
            </Menu>
            {/* =========== dropdown menu ============= */}
          </ul>
        </div>
        <IconButton
          placeholder=""
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="black"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 list-none">
            {NavMenu.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="flex items-center gap-x-1">
            <button
              className="btn btn-active btn-primary w-1/2"
              disabled={lang == "id"}
              onClick={() => setLang("id")}
            >
              <Typography
                placeholder=""
                className={`${lang == "id" ? "text-[#636363]" : ""}`}
              >
                Indonesia
              </Typography>
            </button>
            <button
              className="btn btn-active btn-primary w-1/2"
              disabled={lang == "en"}
              onClick={() => setLang("en")}
            >
              <Typography
                placeholder=""
                className={`${lang == "en" ? "text-[#636363]" : ""}`}
              >
                English
              </Typography>
            </button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
