// import Notificationcard from "./Notificationcard";
// import React, { useEffect, useRef } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import {baseURL} from "../../config/config"
// import { axiosInstance } from "../..";
// import { Placeholder } from "react-bootstrap";

// const Notifications = () => {
//     const {
//       data,
//       isLoading,
//       isError,
//       fetchNextPage,
//       hasNextPage,
//       isFetching,
//     } = useInfiniteQuery(
//       {
//         queryKey: ['notifications'],
//         queryFn: async ({ pageParam=1 }) => {
//           const response = await axiosInstance.get(`${baseURL}notifications/notification/?page=${pageParam}`);
//           return response.data;
//         },
//         getNextPageParam: (lastPage) => {
//           if (lastPage.meta.links.next) {
//             return lastPage.meta.page_number + 1;
//           }
//           return undefined;
//         },
//       }
//     );

//     const bottomRef = React.createRef();

//     useEffect(() => {
//       const observer = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           if (hasNextPage) {
//             fetchNextPage();
//           }
//         }
//       }, { threshold: 1.0 });
//       if (bottomRef.current) {
//         observer.observe(bottomRef.current);
//       }
//     }, [hasNextPage, fetchNextPage, bottomRef.current]);
  

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div className="text-dynamic-white">Error: reteriving</div>;
//   }


//   return (
//     <div>
//       {data.pages.map((data)=>(
//         <>
//         {data.data.map((notification) => (
//           <Notificationcard
//           key={notification.id}
//           title={notification.title}
//           message={notification.message}
//           time={notification.created}
//           />
//         ))}
//         </>
//       ))}
//       <div
//         ref={(node) => {
//           bottomRef.current = node;
//         }}
//       />
//       {isFetching && 
//        <Placeholder as="p" animation="glow" className="rounded">
//        <Placeholder xs={12} style={{ height: "4rem" }} />
//      </Placeholder>
//       }
//     </div>
//   );
// };

// export default Notifications;


import Notificationcard from "./Notificationcard";
import React, { useEffect, useRef, useState } from 'react';

import { Button, Placeholder } from "react-bootstrap";
import { fetchNextPage,  markAllAsReadApi } from "../../redux/api/notificationApi";
import { useDispatch, useSelector } from "react-redux";

const Notifications = () => {
  const bottomRef = useRef();
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (notification.notifications.length <= 10 && notification.currentPage >= 2) {
  //     dispatch(fetchNotifications());
  //   }
  // }, [dispatch , notification]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && notification.hasNextPage && !notification.isLoading) {
          dispatch(fetchNextPage(notification.currentPage));
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current); // Clean up observer
    };
  }, [notification.hasNextPage, notification.currentPage, notification.isLoading, dispatch]);


  
  if (notification.isLoading && notification.notifications.length === 0) {
    return <div><Placeholder as="p" animation="glow" className="rounded">
      <Placeholder xs={12} style={{ height: "4rem" }} />
    </Placeholder>
      <Placeholder as="p" animation="glow" className="rounded">
        <Placeholder xs={12} style={{ height: "4rem" }} />
      </Placeholder>
      <Placeholder as="p" animation="glow" className="rounded">
        <Placeholder xs={12} style={{ height: "4rem" }} />
      </Placeholder></div>;
  }

  if (notification.error) {
    return <div className="text-dynamic-white">{notification.error}</div>;
  }

  const handleReadall = (e) => {
    e.preventDefault();
    console.log("clicked");
    dispatch(markAllAsReadApi());
  }

  
  return (
    <div>
      <div className="notification-header ">
        {notification.unreadCount > 0 && (
          <div className="d-flex justify-content-between align-items-center text-dynamic-white p-2">
            <span className="unread-count text-dynamic-white">Unread Notifications: {notification.unreadCount}</span>
            <Button size="sm" variant="link" onClick={handleReadall} className="text-dynamic-white">
              Mark all as read
            </Button>
          </div>
        )}
      </div>

      {notification.notifications.map((notif) => (
        <Notificationcard
          key={notif.id}
          title={notif.title}
          message={notif.message}
          time={notif.created}
          isUnread={!notif.is_read} // Pass read status as prop
        />
      ))}

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



