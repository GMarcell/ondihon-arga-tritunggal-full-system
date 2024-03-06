import { Typography } from "@material-tailwind/react";

function NavItem({ children, href }) {
  return (
    <li>
      <Typography
        placeholder=""
        as="a"
        href={href || "#"}
        // target={href?.includes("#") ? "_self" : ""}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Typography>
    </li>
  );
}

export default NavItem;