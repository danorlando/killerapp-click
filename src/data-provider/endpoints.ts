export const SPOTIFY_API_BASEURL = 'https://api.spotify.com/v1'


export const songSuggestions = () => {
  return `http://localhost:4000/song`
  //return `https://b8t1bievja.execute-api.us-east-1.amazonaws.com/song`
}

export const getSpotifyTrackEndpoint = (query: string) => {
  return `${SPOTIFY_API_BASEURL}/search?q=${query}&type=track`
}