// export const register = () => {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//       .register("/firebase-messaging-sw.js")
//       .then((registration) => {
//         console.log(
//           "Service Worker registered with scope:",
//           registration.scope
//         );
//       })
//       .catch((error) => {
//         console.error("Error registering service worker:", error);
//       });
//   } else {
//     console.warn("Service Worker is not supported in this browser.");
//   }
// };
