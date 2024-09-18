// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// export const toastNotification = ({ title, description }) => {
//   console.log(title, description);
//   toast(`${title}: ${description}`, {
//     autoClose: 5000, // Duration in ms, can be customized
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// };

// export const sendNativeNotification = ({ title, body }) => {

//    if (!("Notification" in window)) {
//      console.error("This browser does not support desktop notifications.");
//      return;
//    }

//    // Check if the user has granted permission for notifications
//    if (Notification.permission === "granted") {
//      // Show the notification
//      new Notification(title, { body });
//    } else if (Notification.permission !== "denied") {
//      // Ask the user for permission
//      Notification.requestPermission().then((permission) => {
//        if (permission === "granted") {
//          // Show the notification if permission is granted
//          new Notification(title, { body });
//        }
//      });
//    } else {
//      console.log("Notification permission has been denied.");
//    }
//   // Implement your native notification logic
// };
