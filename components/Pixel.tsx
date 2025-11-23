"use client";

import { useEffect } from "react";

// Extend Window type for fbq
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID || "YOUR_PIXEL_ID";

const Pixel: React.FC = () => {
  useEffect(() => {
    if (!PIXEL_ID) {
      console.warn("Meta Pixel ID is not set.");
      return;
    }

    // Inject pixel script only once
    if (!document.getElementById("fb-pixel-script")) {
      const script = document.createElement("script");
      script.id = "fb-pixel-script";
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    } else {
      // Pixel already loaded, just track PageView
      window.fbq?.("track", "PageView");
    }
  }, []);

  return null;
};

// Helper function to track Lead events
export const trackLead = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: "Livestock Landing Page",
    });
  }
};

export default Pixel;
