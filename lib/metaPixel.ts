// export const initFacebookPixel = () => {
//   if (typeof window !== "undefined") {
//     !(function (f: any, b, e, v, n?, t?, s?) {
//       if (f.fbq) return;
//       n = f.fbq = function () {
//         n.callMethod
//           ? n.callMethod.apply(n, arguments)
//           : n.queue.push(arguments);
//       };
//       if (!f._fbq) f._fbq = n;
//       n.push = n;
//       n.loaded = true;
//       n.version = "2.0";
//       n.queue = [];
//       t = b.createElement(e);
//       t.async = true;
//       t.src = "https://connect.facebook.net/en_US/fbevents.js";
//       s = b.getElementsByTagName(e)[0];
//       s.parentNode.insertBefore(t, s);
//     })(window, document, "script");

//     fbq("init", process.env.NEXT_PUBLIC_PIXEL_ID);
//     fbq("track", "PageView");
//   }
// };
