import React, { useContext } from "react";
import {
  Typography,
} from "@material-tailwind/react";
import langContext from "../../hooks/langContext";
import { Auth } from "../../bilinggual";

function Authorization() {
  const {language} = useContext(langContext)
  return (
    <div className="bg-[url('/image/Auth.png')] bg-cover" id='authorization'>
      <div className="container h-full min-h-[80vh] w-full flex items-center mx-auto py-auto">
        
          <div className="p-10 flex justify-content items-center flex-col">
            <div className="">
              <Typography
                placeholder=""
                className=" !leading-tight text-3xl md:text-5xl text-center text-[#1C3A96] font-bold"
                variant="h2"
              >
                {Auth.title[language]}
              </Typography>
              <Typography
                placeholder=""
                className="lg:text-2xl text-center md:my-5 text-black"
              >
                {Auth.sentence[language]}
              </Typography>
            </div>
            <img
              src='/image/auth/certificate.jpg'
              alt="about-us-image"
              className="w-9/12"
            />
          </div>
        
      </div>
    </div>
  );
}

export default Authorization;