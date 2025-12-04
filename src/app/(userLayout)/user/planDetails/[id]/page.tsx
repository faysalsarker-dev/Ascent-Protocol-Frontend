import SinglePlan from "@/src/components/modules/workout/SinglePlan";

export default async function WorkoutPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Invalid plan ID.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="relative z-10 py-10">
        <SinglePlan id={id} />
      </div>
    </div>
  );
}