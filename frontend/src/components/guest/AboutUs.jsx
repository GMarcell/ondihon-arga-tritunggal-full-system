
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Lines from "@/components/sub/Lines";
import { FaDotCircle } from "react-icons/fa";

function AboutUs() {
  return (
    <div
      className="container grid h-full gap-10 min-h-[80vh] w-full grid-cols-1 items-center mx-auto"
      id="about-us"
    >
      <div className="md:grid md:grid-cols-2 gap-4 py-10">
        {/* <div className="md:flex gap-4"> */}
        <div className="">
          <img
            src='/image/about-us/AboutUs.png'
            alt="about-us-image"
            className="h-[80vh] rounded"
          />
        </div>

        <div className="my-auto">
          <Typography
            placeholder=""
            className=" !leading-tight text-3xl md:text-5xl text-center"
            variant="h2"
          >
            About Company
          </Typography>
          <List placeholder="" className='my-4'>
            <ListItem placeholder="" className="gap-4">
              <ListItemPrefix placeholder="">
                <FaDotCircle />
              </ListItemPrefix>
              <Typography placeholder="" className="lg:text-2xl text-black md:text-lg">
                Established in 2023 with very committed and developed spirit
                amongst the team
              </Typography>
            </ListItem>
            <ListItem placeholder="" className="gap-4">
              <ListItemPrefix placeholder="">
                <FaDotCircle />
              </ListItemPrefix>
              <Typography placeholder="" className="lg:text-2xl text-black md:text-lg">
                Founded by visionary entrepreneur with full package of
                experienced in Compressed Air knowledge technology as well as in
                business segment
              </Typography>
            </ListItem>
            <ListItem placeholder="" className="gap-4">
              <ListItemPrefix placeholder="">
                <FaDotCircle />
              </ListItemPrefix>
              <Typography placeholder="" className="lg:text-2xl text-black md:text-lg">
                Company will always strive for sustainable solution for every
                customer gas needs and compressed air needs
              </Typography>
            </ListItem>
          </List>
          <Lines whiteText={false} hideLG />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;