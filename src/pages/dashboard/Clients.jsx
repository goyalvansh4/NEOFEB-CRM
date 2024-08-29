import React from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function Clients() {
  const [showAlerts, setShowAlerts] = React.useState({
    gray: true,
    green: true,
    orange: true,
    red: true,
  });

  const handleClose = (color) => {
    setShowAlerts((prev) => ({ ...prev, [color]: false }));
  };

  const alertsData = [
    { color: "gray", message: "Client information updated successfully." },
    { color: "green", message: "New client added to the database." },
    { color: "orange", message: "Client information needs review." },
    { color: "red", message: "Client record deletion failed." },
  ];

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card className="shadow-lg rounded-lg">
        <CardHeader variant="gradient" color="blue" className="p-6">
          <Typography variant="h6" color="white">
            Client Alerts
          </Typography>
        </CardHeader>
        <CardBody className="px-6 py-4">
          {alertsData.map(
            (alert, index) =>
              showAlerts[alert.color] && (
                <Alert
                  key={index}
                  color={alert.color}
                  className="mb-4 flex justify-between items-center"
                  icon={<InformationCircleIcon className="h-6 w-6" />}
                  action={
                    <Button
                      variant="text"
                      size="sm"
                      className="p-1"
                      onClick={() => handleClose(alert.color)}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </Button>
                  }
                >
                  <Typography variant="small" color="white">
                    {alert.message}
                  </Typography>
                </Alert>
              )
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Clients;