import axios from 'axios';

export function setAcceptLanguageHeader(value: string): void {
  axios.defaults.headers.common['Accept-Language'] = value;
}

export function setTokenHeader(token: string) {
  console.log("setting token header")
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
