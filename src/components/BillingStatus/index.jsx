"use client";

import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Heading } from "../../components";
import { ReactTable } from "../../components/ReactTable";

const tableData = [
  {
    group355: "#12345432",
    may2024: "1 May, 2023",
    group356: "$500",
    group357: "Paid",
  },
  {
    group355: "#12345432",
    may2024: "3 Feb, 2024",
    group356: "$500",
    group357: "Failed",
  },
  {
    group355: "#12345432",
    may2024: "4 May, 2024",
    group356: "$500",
    group357: "Paid",
  },
];

export default function BillingStatus() {
  const tableColumnHelper = createColumnHelper();

  const tableColumns = React.useMemo(() => {
    return [
      tableColumnHelper.accessor("group355", {
        cell: (info) => (
          <div className="flex flex-col items-start">
            <Heading
              size="headingxs"
              as="p"
              className="text-[0.88rem] font-semibold text-text"
            >
              {info.getValue()}
            </Heading>
            <Heading as="p" className="text-[1.00rem] font-normal text-text">
              {info.row.original.may2024}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            {/* <Img src="/icons/calendar.svg" alt="Calendar" width={""} className="w-4 h-4 mr-2" /> */}
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              # Date
            </Heading>
          </div>
        ),
        meta: { width: "11.00rem" },
      }),
      tableColumnHelper.accessor("group356", {
        cell: (info) => (
          <div className="flex items-center">
            {/* <Img src="/icons/dollar.svg" alt="Dollar" className="w-4 h-4 mr-2" /> */}
            <Heading as="p" className="text-[1.00rem] font-normal text-text">
              {info.getValue()}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            {/* <Img src="/icons/service.svg" alt="Service" className="w-4 h-4 mr-2" /> */}
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Service Fee
            </Heading>
          </div>
        ),
        meta: { width: "11.00rem" },
      }),
      tableColumnHelper.accessor("group357", {
        cell: (info) => (
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                info.getValue() === "Paid" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <Heading
              as="p"
              className={`text-[1.00rem] font-normal ${
                info.getValue() === "Paid" ? "text-green-800" : "text-red-800"
              }`}
            >
              {info.getValue()}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            {/* <Img src="/icons/status.svg" alt="Status" className="w-4 h-4 mr-2" /> */}
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Status
            </Heading>
          </div>
        ),
        meta: { width: "11.50rem" },
      }),
    ];
  }, []);

  return (
    <div className="mb-[13.75rem] flex flex-1 flex-col gap-[2.50rem] md:self-stretch">
      <ReactTable
        size="xs"
        bodyProps={{ className: "" }}
        headerCellProps={{ className: "bg-gray-10101" }}
        cellProps={{ className: "border-border border-b border-solid" }}
        columns={tableColumns}
        data={tableData}
      />
    </div>
  );
}
