import { isSupportedBrowser } from "./firebase";

export const register = () => {

  const browserSupport = isSupportedBrowser();

  // Safari does not support FCM, handle it separately
  if (browserSupport.isSafari) {
    console.warn("Safari does not support Firebase Cloud Messaging.");
    // alert("Your browser does not support push notifications.");
    // Consider implementing Apple Push Notification Service (APNs) for Safari
    return;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Error registering service worker:", error);
      });
  } else {
    console.warn("Service Worker is not supported in this browser.");
  }
};
