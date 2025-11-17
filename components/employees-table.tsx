// components/employees-table.tsx
'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import the router for refresh

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
export type Employee = {
  id: string; // Crucial for DELETE
  name: string;
  email: string;
  department: string;
  status: string;
  salary: number;
  hireDate: Date; 
};

// --- DELETE HANDLER ---
async function handleDelete(employeeId: string, router: ReturnType<typeof useRouter>) {
  if (!employeeId || typeof employeeId !== 'string') {
    alert("Error: Invalid employee ID.");
    return;
  }
  
  if (!confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
    return;
  }

  try {
    const deleteUrl = `/api/employees/${employeeId}`; 
    console.log("Attempting DELETE on URL:", deleteUrl);

    const response = await fetch(deleteUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      // Improved error logging based on your console output
      const errorText = await response.text();
      console.error("Server Delete Response Error:", response.status, errorText);
      throw new Error(`Failed to delete employee: Status ${response.status}. Server message: ${errorText.substring(0, 100)}`);
    }

    // Refresh the page to update the table immediately
    router.refresh(); 
    alert("Employee successfully deleted.");

  } catch (error) {
    // Display the more detailed error from the catch block
    console.error("Employee deletion error:", error);
    // Use the error message from the throw statement if available
    alert((error as Error).message || "An unexpected error occurred during deletion.");
  }
}

// The columns definition is now a function to access the router hook
export const getColumns = (router: ReturnType<typeof useRouter>): ColumnDef<Employee>[] => [
  {
    accessorKey: "name",
    header: () => <span className="font-heading text-sm">Employee</span>, 
    cell: ({ row }) => {
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
        colorClass = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
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
    cell: ({ row }) => (
      <div className="flex space-x-2">
          <Button size="sm" variant="secondary" className="text-xs">
            Edit
          </Button>
          <Button 
            size="sm" 
            variant="destructive" 
            className="text-xs"
            onClick={() => handleDelete(row.original.id, router)} // CRITICAL: Passes the ID and router
          >
            Delete
          </Button>
      </div>
    ),
  },
];


// --- 3. DATA RENDERING COMPONENT (The main export) ---
export function EmployeesTable({ employees }: { employees: Employee[] }) {
  const router = useRouter(); // CRITICAL: This hook must be called inside the client component
  // Call getColumns function to generate columns, passing the router
  const columns = getColumns(router);
  
  if (!employees || employees.length === 0) {
    return <div className="p-4 text-muted-foreground font-sans">No employees found in the database.</div>;
  }

  // Pass the data received from the page.tsx component
  return <DataTable columns={columns} data={employees} />;
}