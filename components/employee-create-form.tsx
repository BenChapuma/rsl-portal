'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react"; 

// --- Shadcn UI Components ---
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; 
import { cn } from "@/lib/utils";


// --- Zod Setup Fixes ---
// 1. Define the array with 'as const'
const DEPARTMENT_NAMES = [
  "Innovations", 
  "Engineering", 
  "Energies", 
  "Administration"
] as const;

// 2. Define the Zod Enum Type explicitly (for better type resolution)
type DepartmentUnion = typeof DEPARTMENT_NAMES[number];


// --- Zod Validation Schema ---
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  
  // FIX 1: Using the strict tuple syntax Zod expects for 'as const' arrays
  department: z.enum([
      DEPARTMENT_NAMES[0], // First item passed explicitly
      ...DEPARTMENT_NAMES.slice(1) // Rest of the items spread
    ] as [DepartmentUnion, ...DepartmentUnion[]], // Optional: Strictest type cast
    {
      required_error: "Please select a department.",
    }
  ),
  
  salary: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Salary must be a positive number.",
  }),
  
  // FIX 2: Correcting z.date() structure for required_error
  hireDate: z.date({
    required_error: "A hire date is required.",
  }),
});

type EmployeeFormValues = z.infer<typeof formSchema>;


export function EmployeeCreateForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false); 

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      department: DEPARTMENT_NAMES[0], 
      salary: "70000",
      hireDate: new Date(),
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: EmployeeFormValues) {
    const dataToSend = {
      ...values,
      salary: parseFloat(values.salary),
      hireDate: values.hireDate.toISOString(), 
      status: "Active", 
    };

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      form.reset();
      setOpen(false);
      router.refresh(); 

    } catch (error) {
      console.error("Employee creation error:", error);
      alert("Failed to create employee. Please check the console for details.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 font-heading">
          <Plus className="w-4 h-4 mr-2" />
          Add New Employee
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-rs-dark">New Employee Details</DialogTitle>
          <DialogDescription className="font-sans">
            Enter the details for the new Rydberg Starck employee below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            
            {/* 1. Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alex Johnson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2. Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="name@rslimited.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 3. Department Select */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Use the constant to map options */}
                      {DEPARTMENT_NAMES.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4. Salary Input */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Salary ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="75000.00" {...field} type="number" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 5. Hire Date Picker */}
            <FormField
              control={form.control}
              name="hireDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hire Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="submit" 
                className="font-heading bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Employee'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}