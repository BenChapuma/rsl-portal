'use client';

import { ColumnDef } from "@tanstack/react-table";
// Reusing the generic DataTable component
import { DataTable } from "@/components/employees-table"; 
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";

// 1. Define the Data Structure (Interface)
export type PayrollRun = {
  id: string;
period: string;
  payDate: string;
  employeesPaid: number;
  totalAmount: number;
  status: "Completed" | "Processing" | "Failed";
};

// 2. Define the Columns
export const columns: ColumnDef<PayrollRun>[] = [
  {
    accessorKey: "period",
    header: () => <span className="font-heading text-sm">Pay Period</span>, 
    cell: ({ row }) => {
      // Use the branded rs-dark color and heading font for the period
      return <span className="font-heading text-rs-dark">{row.getValue("period")}</span>;
    },
  },
  {
    accessorKey: "payDate",
    header: () => <span className="font-heading text-sm">Payment Date</span>,
  },
  {
    accessorKey: "employeesPaid",
    header: () => <span className="font-heading text-sm">Employees Paid</span>,
  },
  {
    accessorKey: "totalAmount",
    header: () => <span className="font-heading text-sm">Total Amount</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount") as string);
      // Format as currency (assuming USD for example) and highlight with primary color
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      
      return <span className="font-bold text-primary">{formatted}</span>;
    },
  },
  {
    accessorKey: "status",
    header: () => <span className="font-heading text-sm">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as PayrollRun["status"];
      let colorClass: string;

      if (status === "Completed") {
        // Completed status uses Primary brand color (Dark Teal)
        colorClass = "bg-primary/20 text-primary hover:bg-primary/20";
      } else if (status === "Processing") {
        // Caution/Processing color
        colorClass = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      } else {
        // Failed status uses Destructive color
        colorClass = "bg-destructive/20 text-destructive hover:bg-destructive/20";
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
      // Secondary button for a review action
      <Button size="sm" variant="secondary" className="text-xs hover:bg-secondary/90">
        View Report
      </Button>
    ),
  },
];

// 3. Dummy Data
export const payrollData: PayrollRun[] = [
  {
    id: "P003",
    period: "Oct 1 - Oct 31, 2025",
    payDate: "2025-11-15",
    employeesPaid: 124,
    totalAmount: 125500.00,
    status: "Completed",
  },
  {
    id: "P004",
    period: "Nov 1 - Nov 30, 2025",
    payDate: "2025-12-15",
    employeesPaid: 125,
    totalAmount: 126000.00,
    status: "Processing",
  },
  {
    id: "P002",
    period: "Sep 1 - Sep 30, 2025",
    payDate: "2025-10-15",
    employeesPaid: 123,
    totalAmount: 124000.00,
    status: "Completed",
  },
  {
    id: "P001",
    period: "Aug 1 - Aug 31, 2025",
    payDate: "2025-09-15",
    employeesPaid: 122,
    totalAmount: 123000.00,
    status: "Failed",
  },
];


// 4. Component for app/payroll/page.tsx to use
export function PayrollRunsTable() {
  return (
    <DataTable columns={columns} data={payrollData} />
  );
}