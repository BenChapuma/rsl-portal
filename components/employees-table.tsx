// components/employees-table.tsx
'use client';

// Removed: import React, { useState, useEffect } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";

// --- 1. GENERIC DATATABLE COMPONENT ---
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border shadow-lg border-rs-teal-light">
      <Table>
        <TableHeader className="bg-rs-teal-light/10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-heading text-rs-dark">
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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
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

// --- 2. DATA STRUCTURE & COLUMNS ---
// Export Employee type for use in page.tsx
export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  status: string;
  salary: number;
  hireDate: Date; // Note: Dates from Prisma are typed as Date, but often passed as string/ISO in JSON
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: () => <span className="font-heading text-sm">Employee</span>, 
    cell: ({ row }) => {
      // FIX: Accessor key must match column definition
      return <span className="font-heading text-rs-dark">{row.original.name}</span>;
    },
  },
  {
    accessorKey: "email",
    header: () => <span className="font-heading text-sm">Email</span>,
  },
  {
    accessorKey: "department",
    header: () => <span className="font-heading text-sm">Department</span>,
  },
  {
    accessorKey: "hireDate",
    header: () => <span className="font-heading text-sm">Hire Date</span>,
    cell: ({ row }) => {
      // Assuming row.getValue is a string or Date object
      const dateValue = row.getValue("hireDate");
      const date = dateValue instanceof Date 
        ? dateValue 
        : new Date(dateValue as string);
        
      return date.toLocaleDateString("en-US");
    },
  },
  {
    accessorKey: "status",
    header: () => <span className="font-heading text-sm">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let colorClass: string;

      if (status === "Active") {
        colorClass = "bg-primary/20 text-primary hover:bg-primary/20";
      } else if (status === "Terminated") {
        colorClass = "bg-destructive/20 text-destructive hover:bg-destructive/20";
      } else {
        colorClass = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"; // On Leave
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
      <Button size="sm" variant="secondary" className="text-xs">
        View
      </Button>
    ),
  },
];


// --- 3. DATA RENDERING COMPONENT (The main export) ---
// FIX: EmployeesTable now accepts the data as a prop
export function EmployeesTable({ employees }: { employees: Employee[] }) {
  // Removed: useState and useEffect for data fetching

  if (!employees) {
     // This shouldn't happen if the server component is setup correctly, but good for safety
    return <div className="p-4 text-muted-foreground font-sans">Error loading data.</div>;
  }
  
  if (employees.length === 0) {
    return <div className="p-4 text-muted-foreground font-sans">No employees found in the database.</div>;
  }

  // Pass the data received from the page.tsx component
  return <DataTable columns={columns} data={employees} />;
}