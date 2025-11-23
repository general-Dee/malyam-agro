"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

interface FbqFunction {
  (...args: any[]): void;
  loaded?: boolean;
  version?: string;
  queue?: any[];
}

const Pixel: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Avoid double initialization
    if (window.fbq?.loaded) return;

    // Initialize fbq
    const fbq: FbqFunction = function (...args: any[]) {
      (fbq.queue = fbq.queue || []).push(args);
    };

    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    // Assign to window
    window.fbq = fbq;

    // Inject the Meta Pixel script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    // Initialize Pixel with your Pixel ID from env
    window.fbq("init", process.env.NEXT_PUBLIC_PIXEL_ID);
    window.fbq("track", "PageView");
  }, []);

  return null;
};

export default Pixel;
