import { MdHome, MdSupervisedUserCircle } from 'react-icons/md'
import { PiUsersThreeFill } from "react-icons/pi";
import { GiNewspaper } from "react-icons/gi";
import { TbArticleFilledFilled } from "react-icons/tb";

const adminRoute = [
  {
    name: 'Dashboard',
    path: '/administrator/dashboard',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'User Management',
    path: '/administrator/user-management',
    icon: <PiUsersThreeFill className="h-6 w-6" />,
  },
  {
    name: 'Customer Management',
    path: '/administrator/customer-management',
    icon: <MdSupervisedUserCircle className="h-6 w-6" />,
  },
  {
    name: 'News Management',
    path: '/administrator/news-management',
    icon: <GiNewspaper className="h-6 w-6" />,
  },
  {
    name: 'Article Management',
    path: '/administrator/article-management',
    icon: <TbArticleFilledFilled className="h-6 w-6" />,
  },
]

export default adminRoute