import React from "react";
import { Button, Tooltip, Avatar } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export function Deals() {
  const dealsData = [
    {
      stage: "Qualification",
      percentage: 10,
      deals: [
        {
          company: "Benton",
          source: "Referral",
          date: "29/08/2024",
        },
        {
          company: "Buckley Miller & Wright",
          source: "Cold Email",
          date: "28/08/2024",
        },
      ],
    },
    {
      stage: "Needs Analysis",
      percentage: 20,
      deals: [
        {
          company: "Truhlar And Truhlar Attys",
          source: "Website",
          date: "29/08/2024",
        },
        {
          company: "Chanay",
          source: "Direct Call",
          date: "30/08/2024",
        },
      ],
    },
  ];

  const allDeals = dealsData.flatMap((stage) => stage.deals);

  return (
    <>
    <div className="mt-8 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-800">Deals</h1>
      <Button
        style={{ backgroundColor: "#FE9496" }}
        size="regular"
        onClick={() => console.log("Create Deal")}
      >
        Create Deal 
        </Button>
    </div>
    <div className="py-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-primary text-white text-sm uppercase text-left">
              <th className="py-3 px-4 border-b border-gray-200">S.No</th>
              <th className="py-3 px-4 border-b border-gray-200">Deal Name</th>
              <th className="py-3 px-4 border-b border-gray-200">Deal Source</th>
              <th className="py-3 px-4 border-b border-gray-200">Deal Date</th>
              <th className="py-3 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allDeals.map((deal, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {deal.company}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {deal.source}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {deal.date}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Tooltip content="Edit">
                      <Button
                        variant="text"
                        size="sm"
                        color="blue"
                        className="p-1"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <Button
                        variant="text"
                        size="sm"
                        color="red"
                        className="p-1"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}