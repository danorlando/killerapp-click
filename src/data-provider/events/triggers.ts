import {dispatch, EventNames} from './events';

export function triggerNewTokenEvent(token: string): void {
  dispatch(EventNames.newToken, token);
}
