import {
  UseQueryOptions,
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  QueryObserverResult,
} from "@tanstack/react-query";
import * as t from "./types";
import * as dataService from "./data-service";

export enum QueryKeys {
  songSuggestions = "songSuggestions",
  getUsers = "getUsers",
  createUser = "createUser",
  getUserById = "getUserById",
  updateUserById = "updateUserById",
  deleteUserById = "deleteUserById",
}

export const useSongSuggestionsMutation = (): UseMutationResult<
  t.TSongSuggestionsResult,
  unknown,
  Parameters<typeof dataService.postSongSuggestions>[0]
> => {
  return useMutation(dataService.postSongSuggestions);
};

export const useGetUsersQuery = (): QueryObserverResult<t.TUsersList> => {
  return useQuery<t.TUsersList>([QueryKeys.getUsers], () => dataService.getUsers(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};

export const useCreateUserMutation = (): UseMutationResult<t.TUser, unknown, Parameters<typeof dataService.postCreateUser>[0]> => {
  const queryClient = useQueryClient();
  return useMutation(dataService.postCreateUser, {
    onSuccess: () => {
      queryClient.refetchQueries([QueryKeys.getUsers]);
    },
  });
}

export const useGetUserByIdQuery = (id: string): QueryObserverResult<t.TUser> => {
  return useQuery<t.TUser>([QueryKeys.getUserById, id], () => dataService.getUserById(id));
}

export const useUpdateUserByIdMutation = (): UseMutationResult<t.TUser, unknown, Parameters<typeof dataService.putUpdateUserById>[0]> => {
  const queryClient = useQueryClient();
  return useMutation(dataService.putUpdateUserById, {
    onSuccess: () => {
      queryClient.refetchQueries([QueryKeys.getUsers]);
    },
  });
}

export const useDeleteUserByIdMutation = (): UseMutationResult<t.TApiResponse, unknown, Parameters<typeof dataService.deleteUserById>[0]> => {
  const queryClient = useQueryClient();
  return useMutation(dataService.deleteUserById, {
    onSuccess: () => {
      queryClient.refetchQueries([QueryKeys.getUsers]);
    },
  });
}