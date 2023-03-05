import {TConfig} from './types';

let _config: TConfig;

const LOCAL_STORAGE_KEY = 'redirect_uri';

function setConfig(config: TConfig): void {
  _config = config;
}

function saveCurrentUri(): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, _config.getRedirectUri());
}

function getSavedUri(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}

function getRedirectTo(): string {
  return getSavedUri() || '/';
}

export default {
  setConfig,
  saveCurrentUri,
  getRedirectTo,
};
