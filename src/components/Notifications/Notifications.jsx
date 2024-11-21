// import Notificationcard from "./Notificationcard";
// import React, { useEffect, useRef, useState } from 'react';

// import { Button, Placeholder } from "react-bootstrap";
// import { fetchNextPage,  markAllAsReadApi } from "../../redux/api/notificationApi";
// import { useDispatch, useSelector } from "react-redux";

// const Notifications = () => {
//   const bottomRef = useRef();
//   const notification = useSelector((state) => state.notification);
//   const dispatch = useDispatch();



//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && notification.hasNextPage && !notification.isLoading) {
//           dispatch(fetchNextPage(notification.currentPage));
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (bottomRef.current) {
//       observer.observe(bottomRef.current);
//     }

//     return () => {
//       if (bottomRef.current) observer.unobserve(bottomRef.current); // Clean up observer
//     };
//   }, [notification.hasNextPage, notification.currentPage, notification.isLoading, dispatch]);


  
//   if (notification.isLoading && notification.notifications.length === 0) {
//     return <div><Placeholder as="p" animation="glow" className="rounded">
//       <Placeholder xs={12} style={{ height: "4rem" }} />
//     </Placeholder>
//       <Placeholder as="p" animation="glow" className="rounded">
//         <Placeholder xs={12} style={{ height: "4rem" }} />
//       </Placeholder>
//       <Placeholder as="p" animation="glow" className="rounded">
//         <Placeholder xs={12} style={{ height: "4rem" }} />
//       </Placeholder></div>;
//   }

//   if (notification.error) {
//     return <div className="text-dynamic-white">{notification.error}</div>;
//   }

//   const handleReadall = async(e) => {
//     e.preventDefault();
//     dispatch(markAllAsReadApi());
//   }

//   const NotificationList = React.memo(({ notifications }) => {
//     return (
//       <>
//         {notification.notifications.map((notif) => (
//           <Notificationcard
//           key={notif.id}
//           title={notif.title}
//           message={notif.message}
//           time={notif.created}
//           isUnread={!notif.is_read} // Pass read status as prop
//         />
//         ))}
//       </>
//     );
//   });

  
//   return (
//     <div>
//       <div className="notification-header ">
//         {notification.unreadCount > 0 && (
//           <div className="d-flex justify-content-between align-items-center text-dynamic-white p-2">
//             <span className="unread-count text-dynamic-white">Unread Notifications: {notification.unreadCount}</span>
//             <Button size="sm" variant="link" onClick={handleReadall} className="text-dynamic-white">
//               Mark all as read
//             </Button>
//           </div>
//         )}
//       </div>

//       <NotificationList/>

//       <div ref={bottomRef} />

//       {notification.isLoading && (
//         <Placeholder as="p" animation="glow" className="rounded">
//           <Placeholder xs={12} style={{ height: "4rem" }} />
//         </Placeholder>
//       )}
//     </div>
//   );
// };

// export default Notifications;



import Notificationcard from "./Notificationcard";
import React, { useEffect, useRef } from "react";
import { Button, Placeholder } from "react-bootstrap";
import { fetchNextPage, markAllAsReadApi } from "../../redux/api/notificationApi";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

const NotificationList = React.memo(({ notifications }) => {
  return (
    <>
      {notifications.map((notif) => (
        <Notificationcard
          key={notif.id}
          title={notif.title}
          message={notif.message}
          time={notif.created}
          isUnread={!notif.is_read} // Pass read status as prop
        />
      ))}
    </>
  );
});

const Notifications = () => {
  const bottomRef = useRef(null);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      debounce((entries) => {
        if (entries[0].isIntersecting && notification.hasNextPage && !notification.isLoading) {
          dispatch(fetchNextPage(notification.currentPage));
        }
      }, 300),
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [notification.hasNextPage, notification.currentPage, notification.isLoading, dispatch]);

  const handleReadAll = async (e) => {
    e.preventDefault();
    dispatch(markAllAsReadApi());
  };

  if (notification.isLoading && notification.notifications.length === 0) {
    return (
      <div>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (notification.error) {
    return <div className="text-dynamic-white">{notification.error}</div>;
  }

  return (
    <div>
      <div className="notification-header ">
        {notification.unreadCount > 0 && (
          <div className="d-flex justify-content-between align-items-center text-dynamic-white p-2">
            <span className="unread-count text-dynamic-white">
              Unread Notifications: {notification.unreadCount}
            </span>
            <Button size="sm" variant="link" onClick={handleReadAll} className="text-dynamic-white">
              Mark all as read
            </Button>
          </div>
        )}
      </div>

      <NotificationList notifications={notification.notifications} />

      <div ref={bottomRef} />

      {notification.isLoading && (
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "4rem" }} />
        </Placeholder>
      )}
    </div>
  );
};

export default Notifications;





