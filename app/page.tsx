import { AppLayout } from "@/components/AppLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 
import { Separator } from "@/components/ui/separator"; 
import { DepartmentDistributionChart } from "@/components/department-chart"; // Import the new chart

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

      {/* 1. Summary Cards Area (Existing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
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
      
      {/* 2. Charts Area (New) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* New Chart Component */}
          <DepartmentDistributionChart />
          
          {/* Placeholder for future chart or key metrics */}
          <Card className="shadow-lg border-rs-teal-light">
            <CardHeader>
                <CardTitle className="font-heading text-rs-dark">Upcoming Feature</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mt-2 font-sans">
                    Space reserved for another key metric chart (e.g., Leave Trends).
                </p>
                <div className="h-[230px] flex items-center justify-center">
                    <p className="text-rs-teal-light/50 font-heading text-xl">Rydberg Starck Insights</p>
                </div>
            </CardContent>
          </Card>
      </div>

    </AppLayout>
  );
}