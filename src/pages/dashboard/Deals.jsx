import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  CheckIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";

export function  Deals () {
  const dealsData = [
    {
      stage: "Qualification",
      percentage: 10,
      total: "$250,200.00",
      color: "#A05AFF",
      deals: [
        {
          company: "Benton",
          description: "Benton (Sample)",
          users: ["Vansh Gupta", "John Butt"],
          amount: "$250,000.00",
          date: "29/08/2024",
        },
        {
          company: "Buckley Miller & Wright",
          description: "Buckley Miller & Wright",
          users: ["Vansh Gupta", "Michael Ruta"],
          amount: "$200.00",
          date: "28/08/2024",
        },
      ],
    },
    {
      stage: "Needs Analysis",
      percentage: 20,
      total: "$100,000.00",
      color: "#1BCFB4",
      deals: [
        {
          company: "Truhlar And Truhlar Attys",
          description: "Truhlar And Truhlar",
          users: ["Vansh Gupta", "Sage Wieser"],
          amount: "$45,000.00",
          date: "29/08/2024",
        },
        {
          company: "Chanay",
          description: "Chanay (Sample)",
          users: ["Vansh Gupta", "Josephine Darakjy"],
          amount: "$55,000.00",
          date: "30/08/2024",
        },
      ],
    },
    // Add more stages as needed
  ];

  const getProgressColor = (completion) => {
    if (completion >= 75) return "#1BCFB4"; // Teal
    if (completion >= 50) return "#4BCBEB"; // Light Blue
    if (completion >= 25) return "#9E58FF"; // Deep Purple
    return "#FE9496"; // Coral
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {dealsData.map((stage, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader
              style={{ backgroundColor: stage.color }}
              className="relative h-20"
            >
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Typography variant="h5" color="white">
                  {stage.stage}
                </Typography>
                <Chip
                  value={`${stage.deals.length} Deals`}
                  style={{ backgroundColor: "#FE9496" }}
                  className="text-white"
                />
              </div>
            </CardHeader>
            <CardBody className="p-4">
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-4 font-semibold"
              >
                {stage.total}
              </Typography>
              <div className="space-y-4">
                {stage.deals.map((deal, i) => (
                  <Card
                    key={i}
                    className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {deal.company}
                        </Typography>
                        <Button
                          variant="text"
                          color="blue-gray"
                          className="p-0"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </Button>
                      </div>
                      <Typography
                        color="gray"
                        className="text-sm mb-4 truncate"
                        title={deal.description}
                      >
                        {deal.description}
                      </Typography>
                      <div className="flex items-center mb-4">
                        {deal.users.map((user, idx) => (
                          <Tooltip key={idx} content={user}>
                            <Avatar
                              size="sm"
                              variant="circular"
                              className={`border-2 border-white ${
                                idx !== 0 && "-ml-2"
                              }`}
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user
                              )}&background=9E58FF&color=fff`}
                              alt={user}
                            />
                          </Tooltip>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {deal.amount}
                        </Typography>
                        <Typography
                          color="gray"
                          className="text-sm"
                        >
                          {deal.date}
                        </Typography>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Progress
                          value={stage.percentage}
                          className="w-full mr-4"
                          style={{
                            backgroundColor: "#F0F0F0",
                            height: "6px",
                          }}
                          barProps={{
                            style: {
                              backgroundColor: getProgressColor(
                                stage.percentage
                              ),
                            },
                          }}
                        />
                        <Button
                          variant="filled"
                          size="sm"
                          style={{ backgroundColor: "#1BCFB4" }}
                          className="flex items-center gap-2"
                        >
                          <CheckIcon className="h-4 w-4" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};