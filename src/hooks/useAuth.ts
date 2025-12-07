import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, registerUser, updateMyProfile,updatePassword } from "../services/auth/auth.service";
import { toast } from "sonner";
import toFormData from "../utils/FormDataconverter";
import { loginUser } from "../services/auth/session.service";

export function useCreateUser(workoutPlanId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => registerUser(data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["workout-days", workoutPlanId] });

          toast.success(response.message || "Account created successfully! +50 XP");


      return response;
    },

    onError: (error) => {
      console.error("Failed to create workout day:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    },
  });
}



interface LoginPayload {
  email: string;
  password: string;
}

interface UseLoginUserOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useLoginUser(options?: UseLoginUserOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const result = await loginUser(data);
      
      if (!result.success) {
        throw new Error(result.message || "Login failed");
      }
      
      return result;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
            options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
}


export function useGetMe() {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => getMe(),
  });
}


export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (dataObj) => {
      const formData = toFormData(dataObj);  
      return updateMyProfile(formData);
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
      toast.success("Profile updated!");
      return response;
    },

    onError: (error) => {
      console.error("Profile update failed:", error);
      toast.error("Couldn't update profile. Try again.");
    },
  });
}


export function usePassWordChange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data:{oldPassword:string,newPassword:string}) => {
      return updatePassword(data);
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
      toast.success("Password updated!");
      return response;
    },

    onError: (error) => {
      console.error("Password update failed:", error);
      toast.error("Couldn't update Password. Try again.");
    },
  });
}

