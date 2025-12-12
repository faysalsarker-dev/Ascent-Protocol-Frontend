import DashboardPage from "@/src/components/modules/dashboard";
import { Metadata } from "next";








export const metadata: Metadata = {
  title: 'Dashboard | AuraFit AI',
  description: 'Hunter System Status and Schedule Management',
};


const UserDashboard = () => {
    return (
        <div>
            <DashboardPage/>
        </div>
    );
};

export default UserDashboard;

