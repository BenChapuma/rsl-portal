import { AppLayout } from "@/components/AppLayout";
import { Separator } from "@/components/ui/separator";
import { PayrollRunsTable } from "@/components/payroll-table"; // Imports the table logic

export default function PayrollPage() {
  return (
    <AppLayout>
      
      {/* Header - Uses Brand Colors and Fonts */}
      <header className="mb-8">
        <h1 className="text-4xl font-heading text-rs-dark">
          Payroll Runs
        </h1>
        <p className="text-lg font-sans text-rs-teal-light">
          Review generated payroll runs and manage payments.
        </p>
        {/* Separator uses the rs-teal-dark color */}
        <Separator className="mt-4 bg-rs-teal-dark"/>
      </header>

      {/* Payroll Data Table */}
      <div className="w-full">
        <PayrollRunsTable /> 
      </div>

    </AppLayout>
  );
}