export const fbqTrack = (event: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", event, params);
  }
};
