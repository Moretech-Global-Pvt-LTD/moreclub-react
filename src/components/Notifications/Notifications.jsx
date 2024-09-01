import Notificationcard from "./Notificationcard";
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {baseURL} from "../../config/config"
import { axiosInstance } from "../..";
import { Placeholder } from "react-bootstrap";

const Notifications = () => {
    const {
      data,
      isLoading,
      isError,
      fetchNextPage,
      hasNextPage,
      isFetching,
    } = useInfiniteQuery(
      {
        queryKey: ['notifications'],
        queryFn: async ({ pageParam=1 }) => {
          const response = await axiosInstance.get(`${baseURL}notifications/notification/?page=${pageParam}`);
          return response.data;
        },
        getNextPageParam: (lastPage) => {
          if (lastPage.meta.links.next) {
            return lastPage.meta.page_number + 1;
          }
          return undefined;
        },
      }
    );

    const bottomRef = React.createRef();

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage) {
            fetchNextPage();
          }
        }
      }, { threshold: 1.0 });
      if (bottomRef.current) {
        observer.observe(bottomRef.current);
      }
    }, [hasNextPage, fetchNextPage, bottomRef.current]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: reteriving</div>;
  }


  return (
    <div>
      {data.pages.map((data)=>(
        <>
        {data.data.map((notification) => (
          <Notificationcard
          key={notification.id}
          title={notification.title}
          message={notification.message}
          time={notification.created}
          />
        ))}
        </>
      ))}
      <div
        ref={(node) => {
          bottomRef.current = node;
        }}
      />
      {isFetching && 
       <Placeholder as="p" animation="glow" className="rounded">
       <Placeholder xs={12} style={{ height: "4rem" }} />
     </Placeholder>
      }
    </div>
  );
};

export default Notifications;


