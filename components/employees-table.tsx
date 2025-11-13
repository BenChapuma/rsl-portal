'use client';

import React, { useState, useEffect } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";

// --- 1. GENERIC DATATABLE COMPONENT (Now defined here) ---
// This is the reusable component that renders the table structure.
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
export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  status: string;
  salary: number;
  hireDate: Date;
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: () => <span className="font-heading text-sm">Employee</span>, 
    cell: ({ row }) => {
      return <span className="font-heading text-rs-dark">{row.getValue("name")}</span>;
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
      const date = new Date(row.getValue("hireDate") as string);
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


// --- 3. DATA FETCHING COMPONENT (The main export) ---
export function EmployeesTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch('/api/employees');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Employee[] = await response.json();
        setEmployees(data); 
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="p-4 text-rs-teal-light font-heading text-lg">Loading employee data...</div>;
  }

  if (employees.length === 0) {
    return <div className="p-4 text-muted-foreground font-sans">No employees found in the database.</div>;
  }

  // Pass the live data to the locally defined DataTable component
  return <DataTable columns={columns} data={employees} />;
}