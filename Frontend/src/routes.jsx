import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { FaFolderPlus } from "react-icons/fa";

import { FaReceipt, FaPeopleLine  } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { Home,  Deals  } from "@/pages/dashboard";
import { Leads } from "@/pages/dashboard";
import { SignIn} from "@/pages/auth";
import Clients from "./pages/dashboard/Clients";
import Innvoice from "./pages/Innvoice/Innvoice";
import Employees from "./pages/employees/Employees";
import ManageBillFrom from "./pages/Account/ManageBillFrom";
import Projects from "./pages/Projects/Projects";

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
        icon: <FaReceipt {...icon} />,
        name: "bill From",
        path: "/bill",
        element: <ManageBillFrom/>,
        
      },
      {
        icon: <FaUsers {...icon} />,
        name: "employees",
        path: "/employees",
        element: <Employees />,
        
      },
      {
        icon: <FaFolderPlus {...icon} />,
        name: "projects",
        path: "/projects",
        element: <Projects />,
        
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
    ],
  },
];

export default routes;
