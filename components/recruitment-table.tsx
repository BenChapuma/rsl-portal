'use client';

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/employees-table"; // Reusing the generic DataTable component
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";

// 1. Define the Data Structure (Interface)
export type JobPosting = {
  id: string;
  title: string;
  department: string;
  applicants: number;
  status: "Open" | "Closed" | "Interviewing";
  postedDate: string;
};

// 2. Define the Columns
export const columns: ColumnDef<JobPosting>[] = [
  {
    accessorKey: "title",
    // Use the heading font for column titles
    header: () => <span className="font-heading text-sm">Job Title</span>, 
    cell: ({ row }) => {
      // Use the branded rs-dark color and heading font for the title
      return <span className="font-heading text-rs-dark">{row.getValue("title")}</span>;
    },
  },
  {
    accessorKey: "department",
    header: () => <span className="font-heading text-sm">Department</span>,
  },
  {
    accessorKey: "applicants",
    header: () => <span className="font-heading text-sm">Applicants</span>,
    cell: ({ row }) => {
      // Highlight applicant count with secondary color
      return <span className="font-bold text-secondary">{row.getValue("applicants")}</span>;
    },
  },
  {
    accessorKey: "postedDate",
    header: () => <span className="font-heading text-sm">Posted Date</span>,
  },
  {
    accessorKey: "status",
    header: () => <span className="font-heading text-sm">Status</span>,
    cell: ({ row }) => {
      const status = row.getValue("status") as JobPosting["status"];
      let colorClass: string;

      if (status === "Interviewing") {
        // Caution color
        colorClass = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      } else if (status === "Closed") {
        // Muted color
        colorClass = "bg-gray-100 text-gray-700 hover:bg-gray-100";
      } else {
        // Open status uses Primary brand color (Dark Teal Accent)
        colorClass = "bg-primary/20 text-primary hover:bg-primary/20";
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
      <Button size="sm" variant="outline" className="text-xs border-rs-teal-light hover:bg-rs-teal-light/10">
        View
      </Button>
    ),
  },
];

// 3. Dummy Data
export const jobData: JobPosting[] = [
  {
    id: "J4001",
    title: "Fusion Engineer III",
    department: "Engineering",
    applicants: 45,
    status: "Interviewing",
    postedDate: "2024-09-15",
  },
  {
    id: "J4002",
    title: "AI Research Scientist",
    department: "Innovations",
    applicants: 78,
    status: "Open",
    postedDate: "2024-10-01",
  },
  {
    id: "J4003",
    title: "Office Administrator",
    department: "Administration",
    applicants: 12,
    status: "Open",
    postedDate: "2024-10-10",
  },
  {
    id: "J4004",
    title: "Marketing Lead",
    department: "Administration",
    applicants: 0,
    status: "Closed",
    postedDate: "2024-08-01",
  },
];


// 4. Component for app/recruitment/page.tsx to use
export function JobPostingsTable() {
  // IMPORTANT: We use the generic DataTable component you already created
  // inside components/employees-table.tsx.
  return (
    <DataTable columns={columns} data={jobData} />
  );
}