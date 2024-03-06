
import React, { useContext } from "react";
import {
  Carousel,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Lines from "../components/sub/Lines";
import { FaDotCircle } from "react-icons/fa";
import langContext from "../hooks/langContext";
import { VisionMisionWord } from "../bilinggual";


function VisionMision() {
  const {language} = useContext(langContext)
  return (
    <div className="bg-[url('/image/VisionMissionDark.png')] bg-cover p-8 ">
      <div
        className="container mx-auto grid h-full gap-10 min-h-[80vh] w-full grid-cols-1 items-center my-auto"
        id="vision-mision"
      >
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex justify-center items-center  w-full">
              <div className="">
                <div className="flex justify-center items-center ">
                  <div>
                    <Typography
                      placeholder=""
                      className=" !leading-tight text-3xl md:text-7xl md:font-bold text-center text-white"
                      variant="h2"
                    >
                      {VisionMisionWord.visiTitle[language]}
                    </Typography>
                    <Lines hideText />
                  </div>
                </div>
                <div className="mx-3 my-auto">
                  <Typography
                    placeholder=""
                    className="lg:text-3xl text-center my-5 text-white"
                  >
                    {VisionMisionWord.visiSubtitle[language]}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="">
                ❮
              </a>
              <a href="#slide2" className="">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="md:grid md:grid-rows-2 mx-4">
              <div className="flex justify-center items-center">
                <div>
                  <Typography
                    placeholder=""
                    className=" !leading-tight text-3xl md:text-7xl text-center text-white"
                    variant="h2"
                  >
                    {VisionMisionWord.misiTitle[language]}
                  </Typography>
                  <Lines hideText />
                </div>
              </div>

              <Typography
                placeholder=""
                className="lg:text-2xl text-center my-4 text-white"
              >
                {VisionMisionWord.misiSubtitle[language]}
              </Typography>
              <List placeholder="">
                <ListItem placeholder="" className="gap-4">
                  <ListItemPrefix placeholder="">
                    <FaDotCircle />
                  </ListItemPrefix>
                  <Typography
                    placeholder=""
                    className="lg:text-2xl"
                    color="white"
                  >
                    {VisionMisionWord.misiPoint1[language]}
                  </Typography>
                </ListItem>
                <ListItem placeholder="" className="gap-4">
                  <ListItemPrefix placeholder="">
                    <FaDotCircle />
                  </ListItemPrefix>
                  <Typography
                    placeholder=""
                    className="lg:text-2xl"
                    color="white"
                  >
                    {VisionMisionWord.misiPoint2[language]}
                  </Typography>
                </ListItem>
              </List>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="">
                ❮
              </a>
              <a href="#slide1" className="">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisionMision;