export const SPOTIFY_API_BASEURL = 'https://api.spotify.com/v1'
export const LOCAL_API_BASEURL = import.meta.env.VITE_API_LOCAL_SERVER_URL;

export const songSuggestions = () => {
  return `http://localhost:4000/song`
  //return `https://b8t1bievja.execute-api.us-east-1.amazonaws.com/song`
}

export const getSpotifyTrackEndpoint = (query: string) => {
  return `${SPOTIFY_API_BASEURL}/search?q=${query}&type=track`
}

export const getUsers = () => {
  return `http://localhost:4000/users`
}

export const createUser = () => {
  return `http://localhost:4000/users`
}

export const getUserById = (id: string) => {
  return `http://localhost:4000/users/${id}`
}

export const updateUserById = (id: string) => {
  return `http://localhost:4000/users/${id}`
}

export const deleteUserById = (id: string) => {
  return `http://localhost:4000/users/${id}`
}

export const createChat = () => {
  return `${LOCAL_API_BASEURL}/chat`
}

export const getOpenAIModels = () => {
  return `${LOCAL_API_BASEURL}/models`
}

export const createChatStream = () => {
  return `${LOCAL_API_BASEURL}/chatstream`
}
