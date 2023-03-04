import {Subscriber, subscribe, EventNames} from './events';

export function subscribeToNewTokenReceived(callback: Subscriber['callback']): void {
  subscribe({eventName: EventNames.newToken, callback});
}
