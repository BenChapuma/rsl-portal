'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

// --- UI Components ---
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

// --- Department List ---
const DEPARTMENT_NAMES = [
  "Innovations",
  "Engineering",
  "Energies",
  "Administration"
] as const;

// --- Zod Schema (FULLY Zod v3 Compatible) ---
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  email: z.string().email({
    message: "Invalid email address.",
  }),

  department: z.enum([
    "Innovations",
    "Engineering",
    "Energies",
    "Administration",
  ]).refine(val => val !== undefined, {
    message: "Please select a department.",
  }),

  salary: z.string().refine(val => {
    return !isNaN(parseFloat(val)) && parseFloat(val) > 0;
  }, {
    message: "Salary must be a positive number.",
  }),

  hireDate: z.date().superRefine((val, ctx) => {
    // Zod v3-compatible date validation with custom error
    if (!(val instanceof Date) || isNaN(val.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "A hire date is required.",
      });
    }
  }),
});

type EmployeeFormValues = z.infer<typeof formSchema>;


// --- Component ---
export function EmployeeCreateForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      department: DEPARTMENT_NAMES[0], // default
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
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      form.reset();
      setOpen(false);
      // This call forces the server component (app/employees/page.tsx) to re-render
      router.refresh(); 

    } catch (error) {
      console.error("Employee creation error:", error);
      alert("Failed to create employee. Check console for details.");
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
          <DialogTitle className="font-heading">New Employee Details</DialogTitle>
          <DialogDescription>
            Enter the details for the new employee below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">

            {/* Full Name */}
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

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="name@company.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEPARTMENT_NAMES.map((dep) => (
                        <SelectItem value={dep} key={dep}>
                          {dep}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Salary ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hire Date */}
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
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent align="start" className="w-auto p-0">
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
                disabled={isSubmitting}
                className="font-heading bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Creating..." : "Create Employee"}
              </Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}