"use client";

import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Heading } from "../../components";
import { ReactTable } from "../../components/ReactTable";

export default function BillingStatus({ transactionDetails }) {
  // Check if transactionDetails is provided and has data
  const tableData = transactionDetails?.data?.map(charge => ({
    chargeId: charge.payment_method_details.card.last4, // Last four digits of the card
    date: new Date(charge.created * 1000).toLocaleDateString(), // Convert timestamp to date
    totalAmount: `${(charge.amount / 100).toFixed(2)} ${charge.currency.toUpperCase()}`, // Amount formatted as currency
    status: charge.paid ? "Paid" : "Failed", // Indicate if paid or failed
  })) || []; // Default to an empty array if no data

  const tableColumnHelper = createColumnHelper();

  const tableColumns = React.useMemo(() => {
    return [
      tableColumnHelper.accessor("chargeId", {
        cell: (info) => (
          <div className="flex flex-col items-start">
            <Heading
              size="headingxs"
              as="p"
              className="text-[0.88rem] font-semibold text-text"
            >
              **** **** **** {info.getValue()} {/* Masking the card number */}
            </Heading>
            <Heading as="p" className="text-[1.00rem] font-normal text-text">
              {info.row.original.date}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Card Ending / Date
            </Heading>
          </div>
        ),
        meta: { width: "11.00rem" },
      }),
      tableColumnHelper.accessor("totalAmount", {
        cell: (info) => (
          <div className="flex items-center">
            <Heading as="p" className="text-[1.00rem] font-normal text-text">
              {info.getValue()}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Total Amount
            </Heading>
          </div>
        ),
        meta: { width: "11.00rem" },
      }),
      tableColumnHelper.accessor("status", {
        cell: (info) => (
          <div className="flex items-center">
            <Heading
              as="p"
              className={`text-[1.00rem] font-normal ${
                info.getValue() === "Paid" ? "text-green-600" : "text-red-600"
              }`}
            >
              {info.getValue()}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Status
            </Heading>
          </div>
        ),
        meta: { width: "8.00rem" },
      }),
    ];
  }, []);

  return (
    <div className="mb-[13.75rem] w-[34.37rem] flex flex-col gap-[2.50rem] md:self-stretch md:w-full">
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