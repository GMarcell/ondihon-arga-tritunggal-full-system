
import React from "react";
import CoreValueImage from "@/assets/CoreValue.png";
import Image from "next/image";
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Lines from "@/components/sub/Lines";
import { FaDotCircle } from "react-icons/fa";

function CoreValues() {
  return (
    <div className="container h-full min-h-[80vh] w-full flex items-center mx-auto" id='core-values'>
      <div className="md:grid md:grid-cols-3">
        <div className="my-auto">
          <Typography
            placeholder=""
            className=" !leading-tight text-4xl md:text-6xl text-center text-[#1C3A96] font-bold"
            variant="h2"
          >
            Core Values
          </Typography>
          <Lines hideText/>
          <List placeholder="" className='mx-2'>
            <ListItem placeholder="" className="gap-4">
            <ListItemPrefix placeholder="">
                <FaDotCircle />
              </ListItemPrefix>
              <Typography placeholder="" className="lg:text-2xl text-black">
                At our company, our actions and decisions are guided by a set of
                core values that define who we are and how we operate.
              </Typography>
            </ListItem>
            <ListItem placeholder="" className="gap-4">
            <ListItemPrefix placeholder="">
                <FaDotCircle />
              </ListItemPrefix>
              <Typography placeholder="" className="lg:text-2xl text-black">
                Our commitment to these values sets the foundation for a culture
                of excellence and innovation.
              </Typography>
            </ListItem>
          </List>
        </div>

        <div className='bg-[#1C3A96] flex items-center'>
        <div className="md:my-auto flex flex-col gap-2 px-4 py-10">
          <Typography
            placeholder=""
            className=" !leading-tight text-xl md:text-3xl text-center font-bold text-[#FF881B]"
            variant="h3"
          >
            INTEGRITY
          </Typography>
          <Typography placeholder="" className="lg:text-xl text-center text-white">
            We uphold the highest ethical standards in all our interactions and
            transactions.
          </Typography>
          <Typography
            placeholder=""
            className=" !leading-tight text-xl md:text-3xl text-center font-bold text-[#FF881B]"
            variant="h3"
          >
            INNOVATION
          </Typography>
          <Typography placeholder="" className="lg:text-xl text-white text-center">
            We embrace creativity and continuously seek new ways to improve and
            advance.
          </Typography>
          <Typography
            placeholder=""
            className=" !leading-tight text-xl md:text-3xl text-center font-bold text-[#FF881B]"
            variant="h3"
          >
            TEAMWORK
          </Typography>
          <Typography placeholder="" className="lg:text-xl text-white text-center">
            Our diverse and talented team works together to achieve common
            goals.
          </Typography>
        </div>
        </div>

        <div className="flex justify-center items-center bg-[#FF881B]">
          <Image
            src={CoreValueImage}
            alt="about-us-image"
            className="w-fit"
          />
        </div>
      </div>
      {/* <Lines whiteText={false} hideLG /> */}
    </div>
  );
}

export default CoreValues;