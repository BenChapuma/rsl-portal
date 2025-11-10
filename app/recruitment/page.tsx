import { AppLayout } from "@/components/AppLayout";
import { Separator } from "@/components/ui/separator";
import { JobPostingsTable } from "@/components/recruitment-table"; // Will be created in next step

export default function RecruitmentPage() {
  return (
    <AppLayout>
      
      {/* Header - Uses Brand Colors and Fonts */}
      <header className="mb-8">
        <h1 className="text-4xl font-heading text-rs-dark">
          Recruitment & Job Postings
        </h1>
        <p className="text-lg font-sans text-rs-teal-light">
          Manage job openings, track applicants, and schedule interviews.
        </p>
        {/* Separator uses the rs-teal-dark color */}
        <Separator className="mt-4 bg-rs-teal-dark"/>
      </header>

      {/* Job Postings Data Table */}
      <div className="w-full">
        {/* This component will display all job postings */}
        <JobPostingsTable /> 
      </div>

    </AppLayout>
  );
}