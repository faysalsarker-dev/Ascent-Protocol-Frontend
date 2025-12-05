"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { XPProgressBar } from "@/src/components/modules/profile/XPProgressBar";
import { StatsGrid } from "@/src/components/modules/profile/StatsGrid";
import { UserInfoSection } from "@/src/components/modules/profile/UserInfoSection";
import { ActionButtons } from "@/src/components/modules/profile/ActionButtons";
import { EditNameDialog } from "@/src/components/modules/profile/EditNameDialog";
import { EditWeightDialog } from "@/src/components/modules/profile/EditWeightDialog";
import { EditHeightDialog } from "@/src/components/modules/profile/EditHeightDialog";
import { EditDOBDialog } from "@/src/components/modules/profile/EditDOBDialog";
import { ChangePasswordDialog } from "@/src/components/modules/profile/ChangePasswordDialog";
import  SystemHeader  from '@/src/components/modules/profile/SystemHeader';
import  ProfileHeader  from '@/src/components/modules/profile/ProfileHeader';
import { useGetMe, useUpdateUser } from "@/src/hooks/useAuth";

const initialUserData = {
  name: "Shadow Monarch",
  email: "sung.jinwoo@hunter.guild",
  avatar: null,
  level: 27,
  xp: 27450,
  totalWorkouts: 156,
  currentStreak: 12,
  longestStreak: 45,
  dateOfBirth: new Date(1995, 5, 15),
  weight: 75.5,
  height: 178,
};

const UserProfile = () => {

  const {data}= useGetMe()
  const user = data?.data?.user || {};
  console.log(user,'data')
const update = useUpdateUser()

  const [userData, setUserData] = useState(initialUserData);
  
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [editWeightOpen, setEditWeightOpen] = useState(false);
  const [editHeightOpen, setEditHeightOpen] = useState(false);
  const [editDOBOpen, setEditDOBOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);





  const updateUserInfo = async(data)=>{
    const result = update(data)
  }



  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Radial gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
        
        {/* Hex pattern overlay */}
        <div className="absolute inset-0 hex-pattern opacity-50" />
        
        {/* Scanlines */}
        <div className="absolute inset-0 scanlines opacity-30" />
        
        {/* Vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, hsl(220, 20%, 4%) 100%)"
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-lg mx-auto pb-safe"
      >
        <SystemHeader />
        
        <ProfileHeader
          name={user.name}
          email={user.email}
          avatar={userData.avatar}
          level={user.level}
          onEditName={() => setEditNameOpen(true)}
        />

        <XPProgressBar xp={user?.xp} level={user?.level} />








{/* ==================================================== */}


        <StatsGrid
          totalWorkouts={userData.totalWorkouts}
          currentStreak={userData.currentStreak}
          longestStreak={userData.longestStreak}
        />



{/* ==================================================== */}









        <UserInfoSection
          dateOfBirth={user?.dateOfBirth}
          weight={user?.weight}
          height={user?.height}
          onEditDOB={() => setEditDOBOpen(true)}
          onEditWeight={() => setEditWeightOpen(true)}
          onEditHeight={() => setEditHeightOpen(true)}
        />

        <ActionButtons onChangePassword={() => setChangePasswordOpen(true)} />
      </motion.div>

      {/* Dialogs */}
      <EditNameDialog
        open={editNameOpen}
        onOpenChange={setEditNameOpen}
        currentName={user?.name}
      />

      <EditWeightDialog
        open={editWeightOpen}
        onOpenChange={setEditWeightOpen}
        currentWeight={user?.weight}
      />

      <EditHeightDialog
        open={editHeightOpen}
        onOpenChange={setEditHeightOpen}
        currentHeight={user?.height}
      />

      <EditDOBDialog
        open={editDOBOpen}
        onOpenChange={setEditDOBOpen}
        currentDOB={user?.dateOfBirth}
      />

      <ChangePasswordDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
      />
    </div>
  );
};

export default UserProfile;
