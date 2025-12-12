"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getAllUsers, updateUser } from '../services/admin/admin.service';





export function useUsers(page: number = 1, limit: number = 10, search: string = '', sort: 'newest' | 'oldest' = 'newest') {
  return useQuery({
    queryKey: ['users', page, limit, search, sort],
    queryFn: () => getAllUsers(page, limit, search, sort),
    staleTime: 300000, 
  });
}



export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}


// export function useUpdateUser() {
//   const queryClient = useQueryClient();
//   return useMutation(
//     async ({ userId, payload }) => {
//       return await updateUser(userId, payload);
//     },
//     {
//       onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       },
//     }
//   );
// }

