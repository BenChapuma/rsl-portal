import { AppLayout } from "@/components/AppLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Assuming Card is installed
import { Separator } from "@/components/ui/separator"; // Assuming Separator is installed

export default function Home() {
  return (
    <AppLayout>
      
      {/* Header - Uses Brand Colors and Fonts */}
      <header className="mb-8">
        <h1 className="text-4xl font-heading text-rs-dark">
          Dashboard
        </h1>
        <p className="text-lg font-sans text-rs-teal-light">
          Welcome to the Rydberg Starck HRMS.
        </p>
        <Separator className="mt-4 bg-rs-teal-dark"/>
      </header>

      {/* Main Dashboard Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-rs-teal-dark">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">124</p>
            <p className="text-muted-foreground mt-2">Currently Active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-rs-teal-dark">New Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">18</p>
            <p className="text-muted-foreground mt-2">Pending Review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-rs-teal-dark">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">5</p>
            <p className="text-muted-foreground mt-2">Time Off Requests</p>
          </CardContent>
        </Card>
        
      </div>

    </AppLayout>
  );
}