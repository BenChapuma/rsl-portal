'use client';

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Import the base UI components you installed
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; 

// 1. Define the Data Structure (Interface)
export type Employee = {
  id: string;
  name: string;
  email: string;
  department: "Innovations" | "Engineering" | "Energies" | "Administration";
  status: "Active" | "Terminated" | "On Leave";
};

// 2. Define the Columns
export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    // Use the heading font for column titles
    header: ({ column }) => <span className="font-heading text-sm">Employee Name</span>, 
    cell: ({ row }) => {
      // Use the branded rs-dark color for the name
      return <span className="font-heading text-rs-dark">{row.getValue("name")}</span>;
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => <span className="font-heading text-sm">Department</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <span className="font-heading text-sm">Email</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <span className="font-heading text-sm">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as Employee["status"];
      let colorClass: string;

      if (status === "On Leave") {
        // Yellow/Caution colors
        colorClass = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      } else if (status === "Terminated") {
        // Destructive colors
        colorClass = "bg-destructive/20 text-destructive hover:bg-destructive/20";
      } else {
        // Active status uses Primary brand color (Dark Teal Accent)
        colorClass = "bg-primary/20 text-primary hover:bg-primary/20";
      }

      return (
        <Badge className={`font-sans font-medium ${colorClass}`}>
          {status}
        </Badge>
      );
    },
  },
];

// 3. Dummy Data
export const employeeData: Employee[] = [
  {
    id: "RS1001",
    name: "Alex Johnson",
    email: "alex.j@rslimited.com",
    department: "Innovations",
    status: "Active",
  },
  {
    id: "RS1002",
    name: "Sarah Williams",
    email: "sarah.w@rslimited.com",
    department: "Engineering",
    status: "Active",
  },
  {
    id: "RS1003",
    name: "Robert Brown",
    email: "robert.b@rslimited.com",
    department: "Energies",
    status: "On Leave",
  },
  {
    id: "RS1004",
    name: "Emily Davis",
    email: "emily.d@rslimited.com",
    department: "Administration",
    status: "Active",
  },
  {
    id: "RS1005",
    name: "Michael Wilson",
    email: "michael.w@rslimited.com",
    department: "Innovations",
    status: "Terminated",
  },
];

// 4. Custom DataTable Component (The wrapper that was missing)
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border border-rs-teal-light">
      <Table>
        <TableHeader className="bg-rs-teal-light/20">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              // On hover, lightly highlight the row with the rs-teal-light color
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-rs-teal-light/5" 
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}


// 5. Component for app/employees/page.tsx to use
export function EmployeesTable() {
  return (
    <DataTable columns={columns} data={employeeData} />
  );
}