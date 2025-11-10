'use client';

import { ColumnDef } from "@tanstack/react-table";
// IMPORTANT: Reusing the generic DataTable component from the employee file
import { DataTable } from "@/components/employees-table"; 
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";

// 1. Define the Data Structure (Interface)
export type TimeOffRequest = {
  id: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  days: number;
  type: "Vacation" | "Sick Leave" | "Personal Day";
  status: "Pending" | "Approved" | "Rejected";
};

// 2. Define the Columns
export const columns: ColumnDef<TimeOffRequest>[] = [
  {
    accessorKey: "employeeName",
    header: () => <span className="font-heading text-sm">Employee</span>, 
    cell: ({ row }) => {
      // Use the branded rs-dark color and heading font for the employee name
      return <span className="font-heading text-rs-dark">{row.getValue("employeeName")}</span>;
    },
  },
  {
    accessorKey: "startDate",
    header: () => <span className="font-heading text-sm">Start Date</span>,
  },
  {
    accessorKey: "endDate",
    header: () => <span className="font-heading text-sm">End Date</span>,
  },
  {
    accessorKey: "days",
    header: () => <span className="font-heading text-sm">Days</span>,
    cell: ({ row }) => {
      // Bold days requested
      return <span className="font-bold">{row.getValue("days")}</span>;
    },
  },
  {
    accessorKey: "type",
    header: () => <span className="font-heading text-sm">Type</span>,
  },
  {
    accessorKey: "status",
    header: () => <span className="font-heading text-sm">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as TimeOffRequest["status"];
      let colorClass: string;

      if (status === "Approved") {
        // Success/Approved color (using green variant)
        colorClass = "bg-green-100 text-green-800 hover:bg-green-100";
      } else if (status === "Rejected") {
        // Destructive color
        colorClass = "bg-destructive/20 text-destructive hover:bg-destructive/20";
      } else {
        // Pending status uses Secondary brand color (Light Teal Accent)
        colorClass = "bg-secondary/20 text-secondary-foreground hover:bg-secondary/20";
      }

      return (
        <Badge className={`font-sans font-medium ${colorClass}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="font-heading text-sm">Actions</span>,
    cell: () => (
      // Primary button for the main action (Approve)
      <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
        Approve
      </Button>
    ),
  },
];

// 3. Dummy Data
export const requestData: TimeOffRequest[] = [
  {
    id: "TO101",
    employeeName: "Alex Johnson",
    startDate: "2025-12-24",
    endDate: "2026-01-03",
    days: 8,
    type: "Vacation",
    status: "Pending",
  },
  {
    id: "TO102",
    employeeName: "Sarah Williams",
    startDate: "2025-11-20",
    endDate: "2025-11-20",
    days: 1,
    type: "Personal Day",
    status: "Approved",
  },
  {
    id: "TO103",
    employeeName: "Robert Brown",
    startDate: "2025-10-25",
    endDate: "2025-10-27",
    days: 3,
    type: "Sick Leave",
    status: "Rejected",
  },
  {
    id: "TO104",
    employeeName: "Emily Davis",
    startDate: "2026-01-01",
    endDate: "2026-01-07",
    days: 5,
    type: "Vacation",
    status: "Pending",
  },
];


// 4. Component for app/time-off/page.tsx to use
export function TimeOffRequestsTable() {
  return (
    <DataTable columns={columns} data={requestData} />
  );
}