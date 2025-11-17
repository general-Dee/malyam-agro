import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

const METAPIXEL_ID = process.env.NEXT_PUBLIC_METAPIXEL_ID;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Track PageView on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      (window as any).fbq?.("track", "PageView");
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      {/* Inject Meta Pixel */}
      {METAPIXEL_ID && (
        <>
          <Script id="fb-pixel-script" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${METAPIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>

          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${METAPIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* Main App */}
      <Component {...pageProps} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default MyApp;
