// import { Users, Eye, TrendingUp, Clock, UserPlus, Percent } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
// import { Skeleton } from "@/src/components/ui/skeleton";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/src/components/ui/chart";
// import { Area, AreaChart, XAxis, YAxis } from "recharts";
// import { format, parseISO } from "date-fns";

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//     color: "hsl(var(--primary))",
//   },
// };

// export function AdminOverview() {

//   const statCards = [
//     { title: "Total Visitors", value: stats.totalVisitors.toLocaleString(), icon: Eye, color: "text-blue-500" },
//     { title: "Total Users", value: stats.totalUsers.toLocaleString(), icon: Users, color: "text-green-500" },
//     { title: "Active Users", value: stats.activeUsers.toLocaleString(), icon: TrendingUp, color: "text-emerald-500" },
//     { title: "New This Month", value: stats.newUsersThisMonth.toLocaleString(), icon: UserPlus, color: "text-purple-500" },
//     { title: "Conversion Rate", value: `${stats.conversionRate}%`, icon: Percent, color: "text-orange-500" },
//     { title: "Avg Session", value: `${stats.avgSessionDuration} min`, icon: Clock, color: "text-cyan-500" },
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
//         <p className="text-muted-foreground">Welcome back, Admin</p>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {statCards.map((stat) => (
//           <Card key={stat.title}>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">
//                 {stat.title}
//               </CardTitle>
//               <stat.icon className={`h-4 w-4 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               {isLoading ? (
//                 <Skeleton className="h-8 w-24" />
//               ) : (
//                 <div className="text-2xl font-bold">{stat.value}</div>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Visitor Trends (Last 7 Days)</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <Skeleton className="h-[300px] w-full" />
//           ) : (
//             <ChartContainer config={chartConfig} className="h-[300px] w-full">
//               <AreaChart data={visitorChart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//                 <defs>
//                   <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <XAxis
//                   dataKey="date"
//                   tickLine={false}
//                   axisLine={false}
//                   tickMargin={8}
//                   tickFormatter={(value) => format(parseISO(value), "MMM d")}
//                   className="text-xs"
//                 />
//                 <YAxis
//                   tickLine={false}
//                   axisLine={false}
//                   tickMargin={8}
//                   width={50}
//                   className="text-xs"
//                 />
//                 <ChartTooltip
//                   content={
//                     <ChartTooltipContent
//                       labelFormatter={(value) => format(parseISO(value), "MMMM d, yyyy")}
//                     />
//                   }
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="visitors"
//                   stroke="hsl(var(--primary))"
//                   fill="url(#fillVisitors)"
//                   strokeWidth={2}
//                 />
//               </AreaChart>
//             </ChartContainer>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


export function AdminOverview() {


    return(
        <div>up coming </div>
    )
}