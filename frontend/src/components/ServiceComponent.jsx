
import { Button, Typography } from "@material-tailwind/react";
import React, { useContext } from "react";
import langContext from "../hooks/langContext";
import { serviceWord } from "../bilinggual";

export default function ServiceComponent() {
  const {language} = useContext(langContext)
  return (
    <section className="p-8 bg-gray-200" id="service">
      <div className="container mx-auto mb-10 text-center ">
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-4 text-4xl md:text-6xl text-center text-[#1C3A96] font-bold"
          placeholder=""
        >
          {serviceWord.title[language]}
        </Typography>
        <Typography
          placeholder=""
          variant="lead"
          className="mx-auto w-full px-4 font-normal text-black"
        >
          {serviceWord.Subtitle[language]}
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20">
        <div className="carousel w-full min-h-[50vh]">
          <div id="service1" className="carousel-item relative w-full">
            <div className="flex justify-center text-center items-center w-full bg-[url('/image/service1.png')] bg-cover">
              <div className="px-5">
                <Typography
                  placeholder=""
                  className="md:text-4xl text-2xl font-bold "
                  color="white"
                >
                  {serviceWord.service1Title[language]}
                </Typography>
                <Typography
                  placeholder=""
                  className="md:text-xl font-medium mt-5"
                  color="white"
                >
                  {serviceWord.service1Subtitle[language]}
                </Typography>
                <button className="btn btn-outline btn-warning mt-5">{ language == 'en' ? 'See Products' : 'Lihat Produk'}</button>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#service3" className="">
                ❮
              </a>
              <a href="#service2" className="">
                ❯
              </a>
            </div>
          </div>
          <div id="service2" className="carousel-item relative w-full">
            <div className="flex justify-center text-center items-center w-full bg-[url('/image/service2.png')] bg-cover">
              <div className="px-5">
                <Typography
                  placeholder=""
                  className="md:text-4xl text-2xl font-bold "
                  color="white"
                >
                  {serviceWord.service2Title[language]}
                </Typography>
                <Typography
                  placeholder=""
                  className="md:text-xl font-medium mt-5"
                  color="white"
                >
                  {serviceWord.service2Subtitle[language]}
                </Typography>
                <button className="btn btn-outline mt-5">{ language == 'en' ? 'See Products' : 'Lihat Produk'}</button>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#service1" className="">
                ❮
              </a>
              <a href="#service3" className="">
                ❯
              </a>
            </div>
          </div>
          <div id="service3" className="carousel-item relative w-full">
            <div className="flex justify-center text-center items-center w-full bg-[url('/image/service3.png')] bg-cover">
              <div className="px-5">
                <Typography
                  placeholder=""
                  className="md:text-4xl text-2xl font-bold "
                  color="white"
                >
                  {serviceWord.service3Title[language]}
                </Typography>
                <Typography
                  placeholder=""
                  className="md:text-xl font-medium mt-5"
                  color="white"
                >
                  {serviceWord.service3Subtitle[language]}
                </Typography>
                <button className="btn btn-outline mt-5">{ language == 'en' ? 'See Products' : 'Lihat Produk'}</button>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#service2" className="">
                ❮
              </a>
              <a href="#service1" className="">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
