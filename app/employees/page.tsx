// app/employees/page.tsx

import { AppLayout } from "@/components/AppLayout";
// FIX 2: Import the EmployeesTable component AND the Employee type it exports.
import { EmployeesTable, Employee } from "@/components/employees-table"; 
import { Separator } from "@/components/ui/separator";
import { EmployeeCreateForm } from "@/components/employee-create-form";

// FIX 1: Import PrismaClient directly from the client package.
import { PrismaClient } from '@prisma/client';

// Instantiate the Prisma Client (Recommended for server components if a singleton isn't used)
const prisma = new PrismaClient();

// Use the imported Employee type from the table component
type EmployeeType = Employee;

// Convert the function to 'async' to enable data fetching on the server
export default async function EmployeesPage() {
  
  // SERVER-SIDE DATA FETCHING: This is the code block that router.refresh() re-runs.
  // The 'employee' property is now correctly recognized.
  const employees: EmployeeType[] = await prisma.employee.findMany({
    orderBy: { createdAt: 'desc' }, 
  }) as EmployeeType[];

  return (
    <AppLayout>
      <header className="mb-8">
        <h1 className="text-4xl font-heading text-rs-dark">
          Employee Directory
        </h1>
        <p className="text-lg font-sans text-rs-teal-light">
          Manage all active, inactive, and prospective Rydberg Starck personnel.
        </p>
        <Separator className="mt-4 bg-rs-teal-dark" />
      </header>

      <div className="flex justify-end mb-6">
          <EmployeeCreateForm />
      </div>

      {/* PASSING THE PROP: The EmployeesTable component must now receive the data. */}
      <EmployeesTable employees={employees} />
    </AppLayout>
  );
}