import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { VolumeChartData, WidgetState } from "./types";
import { ErrorCard } from "./ErrorCard";

interface VolumeChartProps {
  data: WidgetState<VolumeChartData>;
  onRetry: () => void;
}

const trendConfig = {
  increasing: { icon: TrendingUp, color: 'text-success', label: 'Trending Up' },
  decreasing: { icon: TrendingDown, color: 'text-destructive', label: 'Trending Down' },
  stable: { icon: Minus, color: 'text-muted-foreground', label: 'Stable' },
};

export function VolumeChart({ data, onRetry }: VolumeChartProps) {
  if (data.status === 'loading') {
    return (
      <Card className="card-glow">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (data.status === 'error') {
    return <ErrorCard message={data.message} onRetry={onRetry} />;
  }

  const { data: chartData, summary } = data.data;
  const trend = trendConfig[summary.trend];
  const TrendIcon = trend.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Card className="card-glow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Weekly Volume
            </CardTitle>
            <div className={`flex items-center gap-1 text-xs ${trend.color}`}>
              <TrendIcon className="h-4 w-4" />
              <span>{trend.label}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-display font-bold text-primary">
              {(summary.avgWeeklyVolume / 1000).toFixed(1)}k
            </span>
            <span className="text-sm text-muted-foreground">avg kg/week</span>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(222, 30%, 18%)" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="weekLabel" 
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 9%)',
                    border: '1px solid hsl(222, 30%, 18%)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
                  formatter={(value: number) => [`${value.toLocaleString()} kg`, 'Volume']}
                />
                <Line
                  type="monotone"
                  dataKey="totalVolume"
                  stroke="hsl(187, 100%, 50%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(187, 100%, 50%)', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: 'hsl(187, 100%, 50%)', stroke: 'hsl(222, 47%, 6%)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
