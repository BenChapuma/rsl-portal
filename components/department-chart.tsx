'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Data: Dummy distribution based on previous employee data
const data = [
  { name: 'Innovations', Employees: 2, fill: 'hsl(var(--primary))' }, // Dark Teal
  { name: 'Engineering', Employees: 1, fill: 'hsl(var(--secondary))' }, // Light Teal
  { name: 'Energies', Employees: 1, fill: 'hsl(var(--primary) / 0.7)' }, // Lighter Dark Teal
  { name: 'Administration', Employees: 1, fill: 'hsl(var(--secondary) / 0.7)' }, // Lighter Light Teal
];

export function DepartmentDistributionChart() {
  // We use CSS variables (hsl(var(--primary))) to ensure the chart colors adapt to your Tailwind theme.
  return (
    <Card className="shadow-lg border-rs-teal-light">
      <CardHeader>
        <CardTitle className="font-heading text-rs-dark">
          Employee Distribution by Department
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* ResponsiveContainer ensures the chart fills its parent Card */}
        <div className="h-[300px]"> 
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {/* Grid lines are a light gray, using Tailwind's gray-200 */}
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> 
              
              {/* X-Axis for Department Names (using Gilroy Regular) */}
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--foreground))', fontFamily: 'var(--font-gilroy-regular)' }} 
                stroke="#64748b" // slate-500
              />
              
              {/* Y-Axis for Employee Count (using Gilroy Regular) */}
              <YAxis 
                tick={{ fill: 'hsl(var(--foreground))', fontFamily: 'var(--font-gilroy-regular)' }} 
                stroke="#64748b" // slate-500
              />
              
              {/* Tooltip uses default styling, which should pick up the overall dark text */}
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '0.375rem', 
                  backgroundColor: 'white', 
                  borderColor: 'hsl(var(--rs-teal-light))', // Use light teal border
                  fontFamily: 'var(--font-gilroy-regular)',
                }}
              />
              
              {/* Legend styling to match the primary brand color */}
              <Legend 
                wrapperStyle={{ fontFamily: 'var(--font-gilroy-regular)', color: 'hsl(var(--primary))' }} 
              />
              
              {/* Bar element: dataKey="Employees" and fill is dynamically pulled from the data */}
              <Bar 
                dataKey="Employees" 
                name="Total Employees" 
                fill="hsl(var(--primary))" // Default fill fallback
                radius={[4, 4, 0, 0]} // Rounded tops
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}