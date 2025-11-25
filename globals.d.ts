// global.d.ts
export {};

declare global {
  var fbq: ((...args: any[]) => void) | undefined;
  interface Window {
    fbq?: typeof fbq;
  }
}
