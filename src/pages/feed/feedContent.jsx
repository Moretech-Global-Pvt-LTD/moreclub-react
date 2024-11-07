import React, { useRef, useCallback } from 'react';
import FeedCard from '../../components/feed/FeedCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../../config/config';
import FeedCardSkeleton from '../../components/Skeleton/feedCardSkeleton';


const FeedContent = () => {

  const fetchPosts = async ({ pageParam = 1 }) => {
    const response = await axios.get(`${baseURL}socialmedia/feeds/?page=${pageParam}`);
    return response.data;
  };
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn:fetchPosts, 
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.links.next) {
        return lastPage.meta.page_number + 1;
      }
    },
  });;

  const observer = useRef();
  const lastFeedElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const dummyPosts = [
    {
      user: {
        first_name: "John",
        last_name: "Doe",
      },
      caption: "Exploring the beautiful landscapes of Iceland! #TravelDiaries",
      media_url: [
        {
          file: "https://via.placeholder.com/600x400", // Image 1 for carousel
        },
        {
          file: "https://via.placeholder.com/600x400", // Image 2 for carousel
        },
      ],
    },
    {
      user: {
        first_name: "Jane",
        last_name: "Smith",
      },
      caption: "Lovely sunset at the beach today.",
      media_url: [
        {
          file: "https://via.placeholder.com/600x400", // Single image post
        },
      ],
    },
    {
      user: {
        first_name: "Alex",
        last_name: "Johnson",
      },
      caption: "Had a great time hiking today! #Adventure",
      media_url: [], // No media post
    },
  ];


  return (
    <div>
      {status === 'pending' && <FeedCardSkeleton/>}
      {status === 'error' && <p>Error getting post</p>}
 
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.data.map((post, index) => {
            if (page.data.length === index + 1) {
              return (
                <div ref={lastFeedElementRef} key={post.id}>
                  <FeedCard post={post} />
                </div>
              );
            } else {
              return <FeedCard key={post.id} post={post} />;
            }
          })}
        </React.Fragment>
      ))}
      {dummyPosts.map((post, index) => ( 
        <FeedCard post={post} key={index}/>
       ))}

      {isFetchingNextPage && <FeedCardSkeleton />}
    </div>
  );
};

export default FeedContent;
