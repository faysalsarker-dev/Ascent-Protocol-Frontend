/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, registerUser, updateMyProfile,updatePassword } from "../services/auth/auth.service";
import { toast } from "sonner";
import toFormData from "../utils/FormDataconverter";
import { loginUser } from "../services/auth/session.service";


interface UseUserOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}


interface LoginPayload {
  email: string;
  password: string;
}




export function useCreateUser(options?: UseUserOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterPayload) => {
      const result = await registerUser(data);
      
      if (!result.success) {
        throw new Error(result.message || "Registration failed");
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






export function useLoginUser(options?: UseUserOptions) {
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
    mutationFn: (dataObj:Record<string, any>) => {
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

