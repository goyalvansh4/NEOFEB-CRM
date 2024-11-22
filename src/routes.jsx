import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { FaReceipt, FaPeopleLine  } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { Home,  Deals  } from "@/pages/dashboard";
import { Leads } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Clients from "./pages/dashboard/Clients";
import Innvoice from "./pages/Innvoice/Innvoice";
import Employees from "./pages/employees/Employees";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Leads",
        path: "/leads",
        element: <Leads/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Deals",
        path: "/deals",
        element: <Deals />,
      },
      {
        icon: <FaPeopleLine {...icon} />,
        name: "clients",
        path: "/clients",
        element: <Clients />,
      },
      {
        icon: <FaReceipt {...icon} />,
        name: "innvoice",
        path: "/innvoice",
        element: <Innvoice />,
        
      },
      {
        icon: <FaUsers {...icon} />,
        name: "employees",
        path: "/employees",
        element: <Employees />,
        
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
