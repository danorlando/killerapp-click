export type TConfig = {
  basepath: string;
  homepath: string;
  getRedirectUri: () => string;
};

let _config: TConfig;

const LOCAL_STORAGE_KEY = 'redirectUri';

function setConfig(config: TConfig): void {
  _config = config;
}

function getBasepath(): string {
  return _config.basepath;
}

function saveCurrentUri(): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, _config.getRedirectUri());
}

function getSavedUri(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}

function getRedirectTo(): string {
  return getSavedUri() || _config.homepath;
}

export default {
  setConfig,
  getBasepath,
  saveCurrentUri,
  getRedirectTo,
};
