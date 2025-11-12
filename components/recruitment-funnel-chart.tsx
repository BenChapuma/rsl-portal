'use client';

import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the colors based on your Tailwind CSS variables for branding
// We use a gradient of the brand colors to show progression through the funnel
const COLORS = [
  'hsl(var(--primary))',        // Dark Teal (Applied - largest)
  'hsl(var(--secondary))',      // Light Teal (Screening)
  'hsl(var(--primary) / 0.7)',  // Lighter Dark Teal (Interviewing)
  'hsl(var(--secondary) / 0.7)',// Lighter Light Teal (Offer Extended)
  'hsl(var(--primary) / 0.5)',  // Muted Dark Teal (Hired - smallest)
];

// Funnel stages data: Dummy data for all open jobs
const funnelData = [
  { name: 'Applied', value: 55 },
  { name: 'Screening', value: 25 },
  { name: 'Interviewing', value: 15 },
  { name: 'Offer Extended', value: 5 },
  { name: 'Hired', value: 3 }, 
];

// Custom Tooltip content to ensure branding and clarity
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-rs-teal-light rounded-md shadow-lg font-sans text-sm">
        <p className="font-heading text-rs-dark mb-1">{`${data.name} Stage`}</p>
        <p className="text-foreground">{`Candidates: ${data.value}`}</p>
        <p className="text-muted-foreground">{`Percentage: ${(data.percent * 100).toFixed(1)}%`}</p>
      </div>
    );
  }
  return null;
};


export function RecruitmentPipelineFunnel() {
  return (
    <Card className="shadow-lg border-rs-teal-light">
      <CardHeader>
        <CardTitle className="font-heading text-rs-dark">
          Recruitment Pipeline Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* We use h-[300px] to match the height of the adjacent Department chart */}
        <div className="h-[300px]"> 
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              
              {/* Doughnut Chart */}
              <Pie
                data={funnelData}
                dataKey="value"
                nameKey="name"
                innerRadius={60} // Creates the hollow center (Doughnut effect)
                outerRadius={120}
                fill="hsl(var(--primary))"
                paddingAngle={2} // Small gap between segments
                labelLine={false}
              >
                {/* Map over data to apply distinct branded colors */}
                {funnelData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    strokeWidth={0} // No stroke to make the colors cleaner
                  />
                ))}
              </Pie>

              {/* Tooltip uses the custom branded content */}
              <Tooltip content={<CustomTooltip />} />
              
              {/* Legend styling to match the brand font and text color */}
              <Legend 
                wrapperStyle={{ 
                  fontFamily: 'var(--font-gilroy-regular)', 
                  color: 'hsl(var(--foreground))',
                  paddingTop: 10,
                }} 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
              />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}