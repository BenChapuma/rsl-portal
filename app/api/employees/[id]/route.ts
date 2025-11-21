// app/api/employees/[id]/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Instantiate the Prisma client
const prisma = new PrismaClient();

/**
 * Utility: check if a string represents an integer number
 * (Needed for compatibility with numeric and string IDs)
 */
function isNumericString(s: string) {
  if (typeof s !== "string") return false;
  // allow negative/positive integers too
  return /^-?\d+$/.test(s);
}

/**
 * =================================================================
 * 1. GET HANDLER (FIXED: Serialization and BigInt/Date handling)
 * =================================================================
 * Fetches a single employee record by their ID.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } } 
) {
  const employeeId = params.id; 

  if (!employeeId) {
    return NextResponse.json({ error: 'Employee ID is required.' }, { status: 400 });
  }

  try {
    const whereClause = isNumericString(employeeId)
      ? { id: Number(employeeId) }
      : { id: employeeId };
      
    const employee = await prisma.employee.findUnique({
      where: whereClause as any,
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employee not found.' }, { status: 404 });
    }
    
    // 💥 CRITICAL FIX: Manually serialize Date and BigInt fields 
    // to prevent JSON serialization errors (like "Do not know how to serialize a BigInt").
    const serializedEmployee = {
      ...employee,
      hireDate: employee.hireDate.toISOString(), // Convert Date object to safe ISO string
      salary: employee.salary.toString(),        // Convert BigInt to string
    };

    return NextResponse.json(serializedEmployee, { status: 200 }); 

  } catch (error) {
    console.error(`Error fetching employee ${employeeId}:`, error);
    // Log the full error to the server console for better debugging
    return NextResponse.json({ error: 'Failed to fetch employee details. See server log for serialization error.' }, { status: 500 });
  }
}


/**
 * =================================================================
 * 2. DELETE HANDLER (Your working, robust code)
 * =================================================================
 * Deletes an employee record by their ID.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } } 
) {
  const employeeId = params.id; 

  if (!employeeId) {
    console.error("DELETE Error: Employee ID is missing from params.");
    return NextResponse.json({ error: 'Missing employee ID in URL path.' }, { status: 400 });
  }

  try {
    const whereClause = isNumericString(employeeId)
      ? { id: Number(employeeId) }
      : { id: employeeId };
      
    await prisma.employee.delete({
      where: whereClause as any,
    });

    return new NextResponse(null, { status: 204 }); 

  } catch (error) {
    console.error(`Error deleting employee ${employeeId}:`, error);

    if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
        return NextResponse.json({ error: 'Employee not found.' }, { status: 404 }); 
    }

    return NextResponse.json({ error: 'Internal server error during deletion.' }, { status: 500 });
  }
}