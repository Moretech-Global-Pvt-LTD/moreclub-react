
// import { initializeApp } from "@firebase/app";
// import { getMessaging, getToken } from "@firebase/messaging";
// import { axiosInstance } from "..";
// import { baseURL, apiKey, authDomain, projectId, storageBucket,messagingSenderId, appId, measurementId } from "../config/config";

// const firebaseConfig = {
//   apiKey: apiKey,
//   authDomain: authDomain,
//   projectId: projectId,
//   storageBucket: storageBucket,
//   messagingSenderId: messagingSenderId,
//   appId: appId,
//   measurementId: measurementId
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
    
   
//   } catch (error) {
//     console.error("Error setting up notifications:", error);
//     // Optionally, retry logic or user notification can be added here
//   }
// };

// export { messaging, setupNotifications };
