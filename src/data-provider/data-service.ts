import * as t from './types';
import request from './request';
import * as endpoints from './endpoints';

export function postSongSuggestions(data: t.TSongSuggestionsRequest): Promise<t.TSongSuggestionsResult> {
  return request.post(endpoints.songSuggestions(), data);
}

export function getSpotifyTrack(query: string) {
  return request.get(endpoints.getSpotifyTrackEndpoint(query));
}