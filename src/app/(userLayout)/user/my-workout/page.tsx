

import AllworkoutPlan from "@/src/components/modules/workout/AllworkoutPlan";
import Header from "@/src/components/modules/workout/Header";






export default function AllPlansPage() {
  return (
    <div className="min-h-screen bg-background">
   
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
      <Header/>






<AllworkoutPlan/>





        {/* Plans Grid */}
     
      </main>
    </div>
  );
}
