/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function GraphCard({ title, data, color = "#4f46e5" }: { title: string; data: any[], color?: string }) {
  // Use a softer color for the grid lines
  const gridStroke = "#e5e7eb"; 

  return (
    <Card className="p-4 shadow-md">
      <p className="text-base font-medium mb-4 flex justify-between items-center">
          {title}
          <span className="text-xs text-muted-foreground">Last 50 points</span>
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" vertical={false} />
            <XAxis 
                dataKey="ts" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#6b7280' }} // Smaller ticks for less clutter
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#6b7280' }} 
            />
            <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                labelStyle={{ fontWeight: 'bold', color: color }}
            />
            {/* Line uses the accent color */}
            <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={3} 
                dot={false} 
                activeDot={{ r: 6, fill: color, stroke: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}