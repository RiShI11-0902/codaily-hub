import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ProgressDataPoint } from "@/types/dashboard";

interface ProgressChartProps {
  data: ProgressDataPoint[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onReset: () => void;
}

export const ProgressChart = ({ data, selectedDate, onDateChange, onReset }: ProgressChartProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Progress Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3 mb-4">
          <label className="text-sm font-semibold">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="border border-border bg-background text-foreground p-2 rounded-md text-sm"
          />
          <button
            className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              cursor={{ fill: 'hsl(var(--muted))' }}
            />
            <Bar 
              dataKey="correctness" 
              fill="hsl(var(--primary))" 
              radius={[6, 6, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
