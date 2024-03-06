
import { Typography, IconButton, Button } from "@material-tailwind/react";
import { IoMdMail, IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { NAV_MENU_EN, NAV_MENU_ID } from "../constants";

export function Footer({ lang }) {
  const NavMenu = lang == 'id' ? NAV_MENU_ID : NAV_MENU_EN

  return (
    <footer className="mt-10 bg-gray-900 px-8 pt-12 bottom-0" id="contacts">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-8 md:justify-between">
          <div className="text-center md:text-left">
            <Typography
              placeholder=""
              as="a"
              href="https://www.material-tailwind.com"
              target="_blank"
              variant="h5"
              color="white"
              className="mb-4"
            >
              Ondihon Arga Tritunggal
            </Typography>
            <Typography
              color="white"
              className="mb-4 font-normal"
              placeholder=""
            >
              sales.helpdesk@id-oat.com
            </Typography>
            <Typography
              color="white"
              className="mb-4 font-normal"
              placeholder=""
            >
              operation.helpdesk@id-oat.com
            </Typography>
            <Typography
              color="white"
              className="mb-4 font-normal"
              placeholder=""
            >
              +62 21 352 90 119
            </Typography>
            <Typography
              color="white"
              className="mb-4 font-normal"
              placeholder=""
              as="a"
              href="https://maps.google.com/?cid=5128289294635446502&entry=gps"
            >
              Jl. Melati XI No.41, RT.003/RW.003, Tanah Tinggi, Kec. Tangerang,
              Kota Tangerang, Banten 15119
            </Typography>
          </div>
          <div className="mt-8 w-full text-center md:text-start md:mt-0 md:w-auto">
            <Typography
              variant="h6"
              color="white"
              className="mb-3"
              placeholder=""
            >
              {lang == 'en' ? 'Contact Us' : 'Hubungi Kami'}
            </Typography>
            <div className="flex gap-5 justify-center">
              <button
                className="btn btn-square btn-ghost"
                onClick={() =>
                  window.open(
                    "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=sales.helpdesk@id-oat.com; operation.helpdesk@id-oat.com",
                    "_blank"
                  )
                }
              >
                <IoMdMail size={28} color="white"/>
              </button>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  window.open(
                    "https://wa.me/6282312073911?text=I'm%20interested%20in%20your%20product%20for%20sale",
                    "_blank"
                  );
                }}
              >
                <IoLogoWhatsapp size={28} color="white"/>
              </button>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/company/pt-ondihon-arga-tritunggal/",
                    "_blank"
                  );
                }}
              >
                <FaLinkedin size={28} color="white"/>
              </button>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/profile.php?id=61557078741473",
                    "_blank"
                  );
                }}
              >
                <FaFacebook size={28} color="white"/>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-y-4 gap-x-8 border-t border-gray-700 py-7 md:justify-between">
          <ul className="flex flex-wrap items-center justify-center md:justify-start">
            {NavMenu.map((link, idx) => (
              <li key={link.name}>
                <Typography
                  placeholder=""
                  as="a"
                  href="#"
                  color="white"
                  className={`py-1 font-medium transition-colors ${
                    idx === 0 ? "pr-3" : "px-3"
                  }`}
                >
                  {link.name}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;