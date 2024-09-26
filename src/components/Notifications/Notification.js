import React, {useEffect, useState } from "react";
import { messaging } from "../../utills/firebase";
import useVisibilityChange from "../../Hooks/useVisibilityChange";
import { sendNativeNotification } from "../../utills/notificationhelper";
import { onMessage } from "firebase/messaging";
import { toast, ToastContainer } from "react-toastify";


const Notification = () => {
  const isForeground = useVisibilityChange();
  const notify = (message) =>
    toast.warn(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
  });

  useEffect(() => {
    onMessage(messaging, (payload) => {
      if (isForeground) {
        const message = (
          <>
            <h6 style={{ color: "black" }}>{payload.notification.title}</h6>
            <p style={{ color: "black" }}>{payload.notification.body}</p>
          </>
        );
        notify(message);
      } else {
        sendNativeNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      }
    });
  }, [isForeground]);

  return <ToastContainer  stacked/>;
};

export default Notification;
