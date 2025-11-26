// global.d.ts
export {};

declare global {
  // global fbq var (no duplicate declarations in components)
  var fbq: ((...args: any[]) => void) | undefined;

  interface Window {
    fbq?: typeof fbq;
  }
}
