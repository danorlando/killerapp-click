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
}

export const useSongSuggestionsMutation = (): UseMutationResult<
  t.TSongSuggestionsResult,
  unknown,
  Parameters<typeof dataService.postSongSuggestions>[0]
> => {
  return useMutation(dataService.postSongSuggestions);
};
