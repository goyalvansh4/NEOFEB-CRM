import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home,  Deals  } from "@/pages/dashboard";
import { Leads } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Clients from "./pages/dashboard/Clients";

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
        icon: <InformationCircleIcon {...icon} />,
        name: "clients",
        path: "/clients",
        element: <Clients />,
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
