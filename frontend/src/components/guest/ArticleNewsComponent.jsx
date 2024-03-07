import { Typography } from "@material-tailwind/react";
import React from "react";

function ArticleNewsComponent() {
  return (
    <div className="container mx-auto grid h-full gap-10 min-h-[80vh] w-full grid-cols-1 items-center">
      <Typography
        placeholder=""
        variant="h1"
        color="white"
        className="mb-4 lg:text-7xl !leading-tight text-3xl md:text-5xl font-bold"
      >
        Nothing here yet
      </Typography>
    </div>
  );
}

export default ArticleNewsComponent;