import React, { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener, setupNotifications } from "../../utills/firebase";
import useVisibilityChange from "../../Hooks/useVisibilityChange";
import { sendNativeNotification, toastNotification } from "../../utills/notificationhelper";

const Notification = () => {
  // const [notification, setNotification] = useState({ title: "", body: "" });
//   const notify = () => toast(<ToastDisplay />);
//   function ToastDisplay() {
//     return (
//       <div>
//         <p>
//           <b>{notification?.title}</b>
//         </p>
//         <p>{notification?.body}</p>
//       </div>
//     );
    //   }
    


  // useEffect(() => {
  //   if (notification?.title) {
  //       //   notify();
  //       console.log("notification", notification);
  //   }
  // }, [notification]);

  // requestForToken();

  // onMessageListener()
  //   .then((payload) => {
  //     setNotification({
  //       title: payload?.notification?.title,
  //       body: payload?.notification?.body,
  //     });
  //   })
  //   .catch((err) => console.log("failed: ", err));

  //   //   return <Toaster />;
  //   return <p></p>
 const isForeground = useVisibilityChange();
 useEffect(() => {
   setupNotifications((message) => {
      console.log("message", message);
     if (isForeground) {
       // App is in the foreground, show toast notification
      
       toastNotification({
         title: "title",
         description: "body",
         status: "info",
       });
     } else {
       // App is in the background, show native notification
       sendNativeNotification({
         title: "title",
         body: "body",
       });
     }
   });
 }, []);
};

export default Notification;
