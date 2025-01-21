import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { Button, Col, Row } from "react-bootstrap";
import UserEventCard from "../../components/cards/userEventcard";
import { Link, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import EventCardSkeleton from "../../components/Skeleton/EventCardSkeleton";
import Divider from "../../components/divider/Divider";
import UniversalErrorbox from "../../components/Layout/UniversalErrorBox";

const UserEventpage = () => {
  const location = useLocation();
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get("starting");
    const end = urlParams.get("ending");
    const active = urlParams.get("active");
    if (active === "Transactions") {
      if (start) setStarting(start);
      if (end) setEnding(end);
    }
  }, [location.search]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["event", starting, ending],
      queryFn: async ({ pageParam = 1 }) => {
        if (starting || ending) {
          const response = await axiosInstance.get(
            `${baseURL}events/own/?start_date=${encodeURIComponent(
              starting
            )}&end_date=${encodeURIComponent(ending)}&page=${pageParam}`
          );
          return response.data;
        } else {
          const response = await axiosInstance.get(
            `${baseURL}events/own/?page=${pageParam}`
          );
          return response.data;
        }
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.links.next) {
          return lastPage.meta.page_number + 1;
        }
        return undefined;
      },
    });

  const bottomRef = React.createRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage) {
            fetchNextPage();
          }
        }
      },
      { threshold: 1.0 }
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
  }, [hasNextPage, fetchNextPage, bottomRef.current]); // Add bottomRef.current to the dependency array

  if (isLoading) {
    return (
      <DashboardLayout title={"Events"}>
      <EventCardSkeleton/>
     </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout title={"Events"}>
        <UniversalErrorbox
        message="Something went wrong while fetching the events." 
      retry={["event", starting, ending]}
      />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={"Events"}>
      <div className="d-flex justify-content-end ">
        <Link to="/event/create">
          <Button>Add New Events</Button>
        </Link>
      </div>
      <Row>
        <Col>
          <div>
            {data.pages.map((data) => (
              <div className="d-flex flex-wrap gap-3">
                {data.data.map((event) => (
                  <UserEventCard events={event} />
                ))}
                {data.data.length === 0 && (
                  <>
                  <p className="text-dynamic-white text-center w-100 my-5 ">You have no events.</p>
                  <Divider/>
                  </>
                )}
              </div>
            ))}
            <div
              ref={(node) => {
                bottomRef.current = node;
              }}
            />
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default UserEventpage;
