import * as t from './types';
import request from './request';
import * as endpoints from './endpoints';

export function postSongSuggestions(data: t.TSongSuggestionsRequest): Promise<t.TSongSuggestionsResult> {
  return request.post(endpoints.songSuggestions(), data);
}

export function getSpotifyTrack(query: string) {
  return request.get(endpoints.getSpotifyTrackEndpoint(query));
}

export function getUsers(): Promise<t.TUsersList> {
  return request.get(endpoints.getUsers());
}

export function postCreateUser(data: t.TUser): Promise<t.TUser> {
  return request.post(endpoints.createUser(), data);
}

export function getUserById(id: string): Promise<t.TUser> {
  return request.get(endpoints.getUserById(id));
}

export function putUpdateUserById(data: t.TUser): Promise<t.TUser> {
  return request.put(endpoints.updateUserById(data.id), data);
}

export function deleteUserById(id: string): Promise<t.TApiResponse> {
  return request.delete(endpoints.deleteUserById(id));
}

export function createChat(data: t.TChat): Promise<t.TChatResponse> {
  return request.post(endpoints.createChat(), data);
}