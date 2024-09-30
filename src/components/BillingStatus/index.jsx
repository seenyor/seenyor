"use client";

import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Button, Heading, Text } from "../../components";
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
      <div className="flex flex-col items-start border-b border-solid border-border">
        <Heading
          size="text5xl"
          as="h6"
          className="text-[1.75rem] font-medium text-text md:text-[1.63rem] sm:text-[1.50rem]"
        >
          Billing Information
        </Heading>
        <Text
          as="p"
          className="mb-[1.25rem] text-[1.13rem] font-normal text-body"
        >
          Update your email and manage your account
        </Text>
      </div>
      <div className="mx-[0.88rem] flex items-center justify-center md:mx-0 sm:flex-col">
        <Heading as="p" className="text-[1.00rem] font-normal text-body">
          Overview
        </Heading>
        <Button
          color="gray_10101"
          size="xs"
          variant="fill"
          className="ml-[0.88rem] min-w-[5.13rem] rounded-[18px] px-[0.88rem] sm:ml-0"
        >
          History
        </Button>
        <Heading
          as="p"
          className="ml-[0.88rem] text-[1.00rem] font-normal text-body sm:ml-0"
        >
          Billing Emails
        </Heading>
        <Heading
          as="p"
          className="ml-[1.75rem] text-[1.00rem] font-normal text-body sm:ml-0"
        >
          Payment Methods
        </Heading>
      </div>
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
