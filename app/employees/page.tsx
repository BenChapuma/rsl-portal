import { AppLayout } from "@/components/AppLayout";
import { Separator } from "@/components/ui/separator";
import { EmployeesTable } from "@/components/employees-table"; // Imports the table logic

export default function EmployeesPage() {
  return (
    <AppLayout>
      
      {/* Header - Uses Brand Colors and Fonts */}
      <header className="mb-8">
        <h1 className="text-4xl font-heading text-rs-dark">
          Employee Directory
        </h1>
        <p className="text-lg font-sans text-rs-teal-light">
          Manage and view details for all active Rydberg Starck personnel.
        </p>
        {/* Separator uses the rs-teal-dark color */}
        <Separator className="mt-4 bg-rs-teal-dark"/>
      </header>

      {/* Employee Data Table */}
      <div className="w-full">
        {/* The data table is rendered here */}
        <EmployeesTable /> 
      </div>

    </AppLayout>
  );
}