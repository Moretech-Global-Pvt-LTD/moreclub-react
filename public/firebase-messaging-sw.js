  importScripts(
    "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
  );

 const firebaseConfig = {
   apiKey: "AIzaSyDGpimUAwYbIxYiUxeNAqIXOUqKnm4oqGw",
   authDomain: "moredealsclub-ae3da.firebaseapp.com",
   projectId: "moredealsclub-ae3da",
   storageBucket: "moredealsclub-ae3da.appspot.com",
   messagingSenderId: "1070037070454",
   appId: "1:1070037070454:web:bdf85aee6d5e06990ee557",
   measurementId: "G-SBWYGVC9BE",
 };


  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  // Customize background notification handling here
  messaging.onBackgroundMessage((payload) => {
    console.log("Background Message service worker:", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });