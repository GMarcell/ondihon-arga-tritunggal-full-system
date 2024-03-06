
import { Typography } from "@material-tailwind/react";
import Lines from "./sub/Lines";
import { useContext } from "react";
import langContext from "../hooks/langContext";

function Hero() {
  const {language} = useContext(langContext)

  return (
    <>
      <header
        className="bg-[url('/image/BackgroundHero.png')] bg-cover p-8"
        id="home"
      >
        <div className="container mx-auto grid h-full gap-10 min-h-[80vh] w-full grid-cols-1 items-center">
          <div className="lg:pl-24 pl-14 lg:pr-24">
            <Typography
              placeholder=""
              variant="h1"
              color="white"
              className="mb-4 lg:text-7xl !leading-tight text-3xl md:text-5xl font-bold"
            >
              PT ONDIHON ARGA TRITUNGGAL
            </Typography>
            <Lines whiteText hideLG={false} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Hero;