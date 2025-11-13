// app/employees/page.tsx

import { AppLayout } from "@/components/AppLayout";
import { EmployeesTable } from "@/components/employees-table";
import { Separator } from "@/components/ui/separator";
import { EmployeeCreateForm } from "@/components/employee-create-form"; // Import the new form

export default function EmployeesPage() {
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

      {/* NEW: Add the form component above the table */}
      <div className="flex justify-end mb-6">
          <EmployeeCreateForm />
      </div>

      <EmployeesTable />
    </AppLayout>
  );
}