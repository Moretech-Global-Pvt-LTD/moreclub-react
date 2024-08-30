// // import { initializeApp } from "@firebase/app";
// // import { getMessaging, getToken, onMessage } from "@firebase/messaging";
// // import { toastNotification } from "./notificationhelper";
// // import { axiosInstance } from "..";
// // import { baseURL } from "../config/config";



// // const firebaseApp = initializeApp(firebaseConfig);
// // const messaging = getMessaging(firebaseApp);
// // const setupNotifications = async () => {
// //   try {
// //     // Request permission for notifications
// //     const permission = await Notification.requestPermission();

// //     if (permission === "granted") {
// //       const token = await getToken(messaging, {
// //         vapidKey:
// //           "BNDkh_gwyoOv_uH_cVBYFTYw1CrRdp47JKo3HH4Ige0qonnIzy0mcjZtDn7ZLminMEaturNv195V6Ifoz1zuJkk",
// //       });
// //       const username = sessionStorage.getItem("username");
// //       try {
// //         await axiosInstance.post(`${baseURL}register/devices/`, {
// //           name: username,
// //           registration_id: token,
// //           active: true,
// //           type: "web",
// //         });
// //       } catch (error) {
// //         console.log(error);
// //         throw new Error(error?.response?.data?.message);
// //       }
// //     } else {
// //       console.log("Notification permission denied.");
// //     }
// //     // Handle foreground notifications
// //     onMessage(messaging, (payload) => {
// //       console.log("Foreground Message firebase:", payload);

// //       toastNotification({
// //         title: payload.notification.title,
// //         description: payload.notification.body,
// //       });
// //     });
// //   } catch (error) {
// //     console.error("Error setting up notifications:", error);
// //   }
// // };
// // export { messaging, setupNotifications };


// import { initializeApp } from "@firebase/app";
// import { getMessaging, getToken, onMessage } from "@firebase/messaging";
// import { toastNotification } from "./notificationhelper";
// import { axiosInstance } from "..";
// import { baseURL } from "../config/config";

// const firebaseConfig = {
//   apiKey: "AIzaSyDGpimUAwYbIxYiUxeNAqIXOUqKnm4oqGw",
//   authDomain: "moredealsclub-ae3da.firebaseapp.com",
//   projectId: "moredealsclub-ae3da",
//   storageBucket: "moredealsclub-ae3da.appspot.com",
//   messagingSenderId: "1070037070454",
//   appId: "1:1070037070454:web:bdf85aee6d5e06990ee557",
//   measurementId: "G-SBWYGVC9BE",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);

// // Function to request notification permission
// const requestNotificationPermission = async () => {
//   const permission = await Notification.requestPermission();
//   if (permission !== "granted") {
//     console.log("Notification permission denied.");
//     return null;
//   }
//   return permission;
// };

// // Function to retrieve the token
// const retrieveToken = async () => {
//   try {
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BNDkh_gwyoOv_uH_cVBYFTYw1CrRdp47JKo3HH4Ige0qonnIzy0mcjZtDn7ZLminMEaturNv195V6Ifoz1zuJkk",
//     });
//     if (!token) {
//       console.error("Failed to retrieve token.");
//       return null;
//     }
//     return token;
//   } catch (error) {
//     console.error("Error retrieving token:", error);
//     return null;
//   }
// };

// // Function to register the token with the backend
// const registerTokenWithBackend = async (token) => {
//   const username = sessionStorage.getItem("username");
//   if (!username) {
//     console.error("Username is missing. Cannot register token.");
//     return;
//   }

//   try {
//     await axiosInstance.post(`${baseURL}register/devices/`, {
//       name: username,
//       registration_id: token,
//       active: true,
//       type: "web",
//     });
//     console.log("Token successfully registered with the backend.");
//   } catch (error) {
//     console.error(
//       "Device registration failed:",
//       error?.response?.data?.message || error.message
//     );
//     throw error;
//   }
// };

// // Main setup function
// const setupNotifications = async (onMessageCallback) => {
//   try {
//     const permission = await requestNotificationPermission();
//     if (!permission) return;

//     const token = await retrieveToken();
//     if (!token) return;

//     await registerTokenWithBackend(token);

//     // Handle foreground notifications
//     onMessage(messaging, (payload) => {
//       console.log("Foreground Message received:", payload);
//       const { title, body } = payload.notification;
//       onMessageCallback({ title, body });
//       // toastNotification({
//       //   title: payload.notification.title,
//       //   description: payload.notification.body,
//       // });
//     });
//   } catch (error) {
//     console.error("Error setting up notifications:", error);
//     // Optionally, retry logic or user notification can be added here
//   }
// };

// export { messaging, setupNotifications };
