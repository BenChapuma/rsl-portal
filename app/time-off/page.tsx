import { AppLayout } from "@/components/AppLayout";
import { Separator } from "@/components/ui/separator";
import { TimeOffRequestsTable } from "@/components/time-off-table"; // Imports the table logic

export default function TimeOffPage() {
  return (
    <AppLayout>
      
      {/* Header - Uses Brand Colors and Fonts */}
      <header className="mb-8">
        <h1 className="text-4xl font-heading text-rs-dark">
          Time Off Requests
        </h1>
        <p className="text-lg font-sans text-rs-teal-light">
          Review, approve, or deny employee time off requests.
        </p>
        {/* Separator uses the rs-teal-dark color */}
        <Separator className="mt-4 bg-rs-teal-dark"/>
      </header>

      {/* Time Off Requests Data Table */}
      <div className="w-full">
        <TimeOffRequestsTable /> 
      </div>

    </AppLayout>
  );
}