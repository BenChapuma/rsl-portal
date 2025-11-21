// components/EmployeeDetailDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/components/employees-table'; // Reuse the Employee type
import { format } from 'date-fns';

interface EmployeeDetailDialogProps {
  employeeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Reusable component for displaying a label/value pair
const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100">
    <span className="font-medium text-sm text-gray-500">{label}</span>
    <span className="text-sm font-heading text-rs-dark">{value}</span>
  </div>
);

export function EmployeeDetailDialog({ employeeId, open, onOpenChange }: EmployeeDetailDialogProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && employeeId) {
      setLoading(true);
      setError(null);
      fetchEmployeeDetails(employeeId);
    }
  }, [open, employeeId]);

  const fetchEmployeeDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/employees/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employee data.');
      }
      const data: Employee = await response.json();
      setEmployee(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    let colorClass: string;

    if (status === 'Active') {
      colorClass = 'bg-primary/20 text-primary hover:bg-primary/20';
    } else if (status === 'Terminated') {
      colorClass = 'bg-destructive/20 text-destructive hover:bg-destructive/20';
    } else {
      colorClass = 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    }

    return (
      <Badge className={`font-sans font-medium ${colorClass}`}>
        {status}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-rs-dark">Employee Details</DialogTitle>
          <DialogDescription>
            Detailed view of the selected employee record.
          </DialogDescription>
        </DialogHeader>

        {loading && <div className="p-4 text-center">Loading...</div>}
        {error && <div className="p-4 text-center text-red-500">{error}</div>}

        {employee && (
          <div className="grid gap-4 py-4">
            <h3 className="text-xl font-heading text-rs-dark border-b pb-2">{employee.name}</h3>

            <DetailItem label="Email" value={employee.email} />
            <DetailItem label="Department" value={employee.department} />
            <DetailItem label="Salary" value={`$${employee.salary.toLocaleString('en-US')}`} />
            <DetailItem label="Hire Date" value={format(new Date(employee.hireDate), 'PPP')} />
            <div className="flex items-center justify-between py-2">
                <span className="font-medium text-sm text-gray-500">Status</span>
                {getStatusBadge(employee.status)}
            </div>
            <DetailItem label="Employee ID" value={employee.id} />
          </div>
        )}
        <Button onClick={() => onOpenChange(false)} className="mt-4">Close</Button>
      </DialogContent>
    </Dialog>
  );
}