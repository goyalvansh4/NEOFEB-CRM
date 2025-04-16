import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import LeadDetails from "../pages/Leads/LeadDetails";
import AddClient from "../pages/Clients/AddClient";
import ClientDetails from "../pages/Clients/ClientDetails";
import AddLead from "../pages/Leads/AddLead";
import ManageSource from "../pages/Leads/ManageSource";
import FollowUp from "../pages/Leads/FollowUp";
import { ProtectedRoute } from "../../ProtectedRoute/ProtectedRoute";
import InvoiceDetails from "../pages/Innvoice/InvoiceDetails";
import AddEmployee from "../pages/employees/AddEmployee";
import EmployeeDetails from "../pages/employees/EmployeeDetails";
import AddProject from "../pages/Projects/AddProject";
import ProjectDetails from "../pages/Projects/ProjectDetails";
import EditLead from "../pages/Leads/EditLead";
import AddTransaction from "../pages/Transactions/AddTransaction";
import BankDetails from "../pages/Bank/BankDetails";


export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          {/* Wrap all protected routes inside ProtectedRoute */}
          <Route
            path="/*"
            element={
              // <ProtectedRoute>
                <Routes>
                  {routes.map(
                    ({ layout, pages }) =>
                      layout === "dashboard" &&
                      pages.map(({ path, element }) => (
                        <Route exact path={path} element={element} />
                      ))
                  )}
                  <Route path="/leads/:id" element={<LeadDetails />} />
                  <Route path="/leads/editLead/:id" element={<EditLead />} />
                  <Route path="/addlead" element={<AddLead />} />
                  <Route path="/followUp" element={<FollowUp />} />
                  <Route path="/addClient" element={<AddClient />} />
                  <Route path="/client/:id" element={<ClientDetails />} />
                  <Route path="/invoice/:id" element={<InvoiceDetails />} />
                  <Route path="/addlead/add-source" element={<ManageSource />} />
                  <Route path="employees/addEmployee" element={<AddEmployee />} />
                  <Route path="employees/:id" element={<EmployeeDetails />} />
                  <Route path="/projects/addProject" element={<AddProject />} />
                  <Route path="/projects/:id" element={<ProjectDetails />} />
                  <Route path="/bank/:id" element={<BankDetails />} />
                  <Route path="/bank/transactions/:id" element={<AddTransaction />} />
                </Routes>
              // </ProtectedRoute>
            }
          />
        </Routes>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
