// app/api/employees/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// IMPORTANT: We create a single instance of PrismaClient outside the handler 
// to ensure connection pooling works efficiently.
const prisma = new PrismaClient();

// Handler for POST requests to create a new employee
export async function POST(request: Request) {
  try {
    // 1. Parse the JSON body from the incoming request
    const body = await request.json();

    // 2. Use Prisma to insert the new employee into the database
    // We rely on the frontend to send correctly typed data
    const newEmployee = await prisma.employee.create({
      data: {
        name: body.name,
        email: body.email,
        department: body.department,
        status: body.status, // Should be "Active"
        salary: body.salary,
        hireDate: body.hireDate, // ISO string is handled by Prisma
      },
    });

    // 3. Return the newly created employee data
    return NextResponse.json(newEmployee, { status: 201 });

  } catch (error) {
    console.error("Failed to create new employee:", error);
    
    // Check for unique constraint error (e.g., duplicate email)
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return NextResponse.json(
        { error: 'An employee with this email already exists.' },
        { status: 409 }
      );
    }
    
    // Generic error handling
    return NextResponse.json(
      { error: 'Internal server error while creating employee.' },
      { status: 500 }
    );
  } finally {
    // await prisma.$disconnect(); 
  }
}

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