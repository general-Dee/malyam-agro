// frontend/components/Pixel.tsx
import { useEffect } from "react";

declare global {
  interface Fbq {
    (...args: any[]): void;
    queue?: any[];
    loaded?: boolean;
    version?: string;
  }

  interface Window {
    fbq?: Fbq;
  }
}

const Pixel = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    if (!pixelId) return;

    // Only add the script if it hasn't been added yet
    if (!document.getElementById("fb-pixel")) {
      const script = document.createElement("script");
      script.id = "fb-pixel";
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      script.onload = () => {
        if (!window.fbq) {
          window.fbq = ((...args: any[]) => {
            window.fbq!.queue = window.fbq!.queue || [];
            window.fbq!.queue.push(args);
          }) as Fbq;

          window.fbq.loaded = true;
          window.fbq.version = "2.0";
          window.fbq.queue = window.fbq.queue || [];

          // Initialize Pixel
          window.fbq("init", pixelId);

          // Track page view
          window.fbq("track", "PageView");
        }
      };
    }
  }, []);

  return null;
};

export default Pixel;
