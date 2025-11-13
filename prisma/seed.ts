// prisma/seed.ts

// CORRECT IMPORT: Import both the PrismaClient class (runtime) and the Prisma namespace (types)
import { PrismaClient, Prisma } from '@prisma/client' 

const prisma = new PrismaClient()

// Dummy data for initial seeding
const employeeData: Prisma.EmployeeCreateInput[] = [
  {
    name: "Alex Johnson",
    email: "alex.johnson@rslimited.com",
    department: "Innovations",
    status: "Active",
    salary: 110000.00,
    hireDate: new Date("2020-05-15T00:00:00Z"),
  },
  {
    name: "Sarah Williams",
    email: "sarah.williams@rslimited.com",
    department: "Engineering",
    status: "Active",
    salary: 95000.00,
    hireDate: new Date("2021-08-01T00:00:00Z"),
  },
  {
    name: "Robert Brown",
    email: "robert.brown@rslimited.com",
    department: "Energies",
    status: "On Leave",
    salary: 80000.00,
    hireDate: new Date("2022-01-20T00:00:00Z"),
  },
  {
    name: "Emily Davis",
    email: "emily.davis@rslimited.com",
    department: "Administration",
    status: "Active",
    salary: 72000.00,
    hireDate: new Date("2019-11-01T00:00:00Z"),
  },
  {
    name: "Michael Wilson",
    email: "michael.wilson@rslimited.com",
    department: "Innovations",
    status: "Terminated",
    salary: 130000.00,
    hireDate: new Date("2018-03-10T00:00:00Z"),
  },
];

async function main() {
  console.log(`Start seeding ...`)
  for (const e of employeeData) {
    // Check if the email already exists before creating (to prevent unique constraint errors)
    const existingEmployee = await prisma.employee.findUnique({
      where: { email: e.email },
    });

    if (!existingEmployee) {
      const employee = await prisma.employee.create({
        data: e,
      })
      console.log(`Created employee with id: ${employee.id}`)
    } else {
      console.log(`Skipping employee: ${e.email} (already exists)`)
    }
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })