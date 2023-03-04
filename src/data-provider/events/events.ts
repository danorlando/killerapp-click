export enum EventNames {
  newToken = 'newTokenReceived',
}

export type Subscriber = {eventName: string; callback: (data: string) => void};

let subscribers: Subscriber[] = [];

export function subscribe(s: Subscriber): void {
  subscribers.push(s);
}

export function dispatch(eventName: EventNames, data: string): void {
  subscribers.forEach((subscriber) => {
    if (subscriber.eventName === eventName) {
      subscriber.callback(data);
    }
  });
}

/**
 * to reset a list of subscribers
 * intended to be used in tests only
 * 'cause `subscribers` is not exported
 */
export function __resetSubscribers(): void {
  subscribers = [];
}
