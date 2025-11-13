// app/api/employees/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// IMPORTANT: We create a single instance of PrismaClient outside the handler 
// to ensure connection pooling works efficiently.
const prisma = new PrismaClient();

// Handler for GET requests to fetch all employees
export async function GET() {
  try {
    // 1. Fetch data from the database using Prisma
    const employees = await prisma.employee.findMany({
      // Select specific fields for the table display
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        status: true,
        salary: true,
        hireDate: true,
      },
      // Sort by name for a clean initial display
      orderBy: {
        name: 'asc',
      },
    });

    // 2. Return the data as a JSON response
    return NextResponse.json(employees, { status: 200 });
    
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    // 3. Handle errors
    return NextResponse.json(
      { error: 'Failed to retrieve employee data from the database.' },
      { status: 500 }
    );
  } finally {
    // Note: In Next.js serverless functions, disconnect is often omitted 
    // to allow connections to persist in the pool. For simplicity here, 
    // we let the serverless function environment manage the connection.
    // await prisma.$disconnect(); 
  }
}