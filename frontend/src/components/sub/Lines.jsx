import { Typography } from "@material-tailwind/react";
import { useContext } from "react";
import langContext from "../../hooks/langContext";
import {homeTagline} from '../../bilinggual'

function Lines({ whiteText, hideLG, hideText }) {
  const {language} = useContext(langContext)
  return (
    <div>
      <div>
        <div className="w-full min-h-1 bg-[#e8ae20]" />
        <div className="w-full min-h-1 bg-[#0D075A]" />
        <div className="w-full min-h-1 bg-white" />
        <div className="w-full min-h-1 bg-[#ac8c3c]" />
      </div>
      {!hideText && (
        <div className="flex justify-between align-center">
          <Typography
            placeholder=""
            color={whiteText ? "white" : "black"}
            className={`lg:text-4xl ${hideLG ? "lg:hidden" : ""}`}
          >
            {homeTagline[language]}
          </Typography>
          <Typography
            placeholder=""
            color={whiteText ? "white" : "black"}
            className={`lg:text-lg ${hideLG ? "lg:hidden" : ""}`}
          >
            &copy; 2024
          </Typography>
        </div>
      )}
    </div>
  );
}

export default Lines;