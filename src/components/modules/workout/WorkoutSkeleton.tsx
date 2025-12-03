import { Skeleton } from "@/src/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";

export function WorkoutSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header Skeleton */}
      <div className="max-w-6xl mx-auto mb-8">
        <Skeleton className="h-10 w-72 mb-3" />
        <Skeleton className="h-5 w-48" />
      </div>
      
      {/* Tabs Skeleton */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-20 rounded-lg shrink-0" />
          ))}
        </div>
      </div>
      
      {/* Cards Skeleton */}
      <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="glass-elevated">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-5 w-20 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-14 rounded-lg" />
                ))}
              </div>
              <Skeleton className="h-16 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
