
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { BsBrowserEdge } from "react-icons/bs";
import { FaRegBuilding } from "react-icons/fa";
import langContext from "../hooks/langContext";
import { useContext } from "react";
import { ContactsWord } from "../bilinggual";

export default function ContactsComponent() {
  const {language} = useContext(langContext)

  return (
    <section
      className="px-8 py-16 bg-gray-200 min-h-[60vh] flex justify-center items-center"
      id="contacts"
    >
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
        <div className="my-auto">
          <Typography
            variant="h3"
            placeholder=""
            className="!leading-tight text-3xl md:text-5xl text-[#1C3A96] font-bold"
          >
            {ContactsWord.title[language]}
          </Typography>
          <Typography
            variant="h4"
            placeholder=""
            className="!leading-tight text-xl md:text-2xl text-[#1C3A96] font-bold"
          >
            {ContactsWord.subtitle[language]}
          </Typography>
          <List placeholder="" className="mt-5">
            <ListItem placeholder="" className="flex justify-between">
              <ListItemPrefix placeholder="" className="w-1/5">
                <div className="flex justify-center flex-col items-center">
                  <FaRegBuilding size={28} color="black" />
                  <Typography placeholder="" color="black">
                    Main
                  </Typography>
                </div>
              </ListItemPrefix>
              <div className="w-full">
                <Typography placeholder="" color="black">
                  18 Office Park 21st Floor.
                </Typography>
                <Typography placeholder="" color="black">
                  Jl. TB Simatupang No.18, Jakarta Selatan
                </Typography>
                <Typography placeholder="" color="black">
                  DKI Jakarta - 12520
                </Typography>
              </div>
            </ListItem>
            <ListItem placeholder="" className="flex justify-between">
              <ListItemPrefix placeholder="" className="w-1/5">
                <div className="flex justify-center flex-col items-center">
                  <FaRegBuilding size={28} color="black" />
                  <Typography placeholder="" color="black">
                    Operation
                  </Typography>
                </div>
              </ListItemPrefix>
              <div className="w-full">
                <Typography placeholder="" color="black">
                  Jl. Melati XI. No.41
                </Typography>
                <Typography placeholder="" color="black">
                  (Buaran Indah Toll Gate Circle Road)
                </Typography>
                <Typography placeholder="" color="black">
                  Tanah Tinggi, Kota Tangerang - 15119
                </Typography>
              </div>
            </ListItem>
            <ListItem placeholder="" className="flex justify-between">
              <ListItemPrefix
                placeholder=""
                className="w-1/5 flex justify-center"
              >
                <IoCall size={28} color="black" />
              </ListItemPrefix>
              <div className="w-full">
                <Typography placeholder="" className="text-xl" color="black">
                  +62 21 352 90 119
                </Typography>
              </div>
            </ListItem>
            <ListItem placeholder="" className="flex justify-between">
              <ListItemPrefix
                placeholder=""
                className="w-1/5 flex justify-center"
              >
                <IoMdMail size={28} color="black" />
              </ListItemPrefix>
              <div className="w-full">
                <Typography placeholder="" className="text-xl" color="black">
                  sales.helpdesk@id-oat.com
                </Typography>
                <Typography placeholder="" className="text-xl" color="black">
                  operation.helpdesk@id-oat.com
                </Typography>
              </div>
            </ListItem>
            <ListItem placeholder="" className="flex justify-between">
              <ListItemPrefix
                placeholder=""
                className="w-1/5 flex justify-center"
              >
                <BsBrowserEdge size={28} color="black" />
              </ListItemPrefix>
              <div className="w-full">
                <Typography placeholder="" className="text-xl" color="black">
                  www.ondihon-arga.com
                </Typography>
              </div>
            </ListItem>
          </List>
        </div>
        <div className="flex justify-center items-center">
          <img src='/image/contact/ContactUs.png' alt="" />
        </div>
      </div>
    </section>
  );
}
