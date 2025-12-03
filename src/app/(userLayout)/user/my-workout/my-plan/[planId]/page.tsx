import SinglePlan from "@/src/components/modules/workout/SinglePlan";

export default async function WorkoutPage({ params }: { params: { planId: string } }) {
  const { planId } = await params;
console.log(planId);
  if (!params.planId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Invalid plan ID.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <SinglePlan id={params.planId} />
      </div>
    </div>
  );
}
