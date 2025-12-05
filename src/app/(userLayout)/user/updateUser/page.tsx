"use client"

import { updateProfileExtras } from "@/src/services/auth/auth.service";
import { toast } from "sonner";
import { ExtrasForm } from "@/src/schemas/register.schema";
import { RegisterStepExtras } from "@/src/components/modules/auth/RegisterStepExtras";

const UpdateUser = () => {

const handleExtrasSubmit = async (extrasData: ExtrasForm) => {
    console.log('call updates');
  const hasExtrasData = 
    extrasData.avatar || 
    extrasData.bio || 
    extrasData.dateOfBirth || 
    extrasData.gender || 
    extrasData.weight || 
    extrasData.height;

  if (!hasExtrasData) {
    return;
  }


  try {
    const formData = new FormData();
    
    // Build data object for non-file fields
    const data: Record<string, any> = {};
    if (extrasData.bio) data.bio = extrasData.bio;
    if (extrasData.dateOfBirth) data.dateOfBirth = extrasData.dateOfBirth;
    if (extrasData.gender) data.gender = extrasData.gender;
    if (extrasData.weight) data.weight = extrasData.weight;
    if (extrasData.height) data.height = extrasData.height;

    // Append as JSON string with key 'data' (for Multer)
    if (Object.keys(data).length > 0) {
      formData.append('data', JSON.stringify(data));
    }
    
    if (extrasData.avatar) {
      formData.append('file', extrasData.avatar);
    }

    const updateResult = await updateProfileExtras(formData);
    console.log(updateResult);
    
    if (!updateResult.success) {
      toast.warning("Some profile details couldn't be saved. You can update them later in settings.");
    } else {
      toast.success("Profile enhanced successfully! +50 XP");
    }
    
  } catch (error) {
    console.error("Profile update error:", error);
    toast.warning("Profile details couldn't be saved. You can update them later in settings.");
  } 
  
 
};



    return (
        <div className=" bg-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-2">
             <RegisterStepExtras
                            key="extras"
                            onSubmit={handleExtrasSubmit}
                       
                           
                          />
        </div>
    );
};

export default UpdateUser;