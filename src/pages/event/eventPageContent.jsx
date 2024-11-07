import React, { useEffect, useState } from "react";
import EventCard from "../../components/cards/Eventcard";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import Divider from "../../components/divider/Divider";
import { useSelector } from "react-redux";
import EventCardSkeleton from "../../components/Skeleton/EventCardSkeleton";

const EventpageContent = () => {
  const location = useLocation();
  const [starting, setStarting] = useState("");
  const [ending, setEnding] = useState("");
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);

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
          const response = await axios.get(
            `${baseURL}events/?start_date=${encodeURIComponent(
              starting
            )}&end_date=${encodeURIComponent(ending)}&page=${pageParam}`
          );
          return response.data;
        } else {
          const response = await axios.get(
            `${baseURL}events/?page=${pageParam}`
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
      <>
        <EventCardSkeleton/>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="text-dynamic-white">Error: reteriving</div>
        <Divider />
      </>
    );
  }

  return (
    <Row>
      {/* <Col md={3} className="mt-4">
        <FilterSection />
      </Col> */}
      {user?.user?.user_type !== "NORMAL" && business.businessProfile.is_verified &&
        <div className="d-flex justify-content-end  mt-2">
          <Link to="/event/create">
            <Button variant="warning">Add New Events</Button>
          </Link>
        </div>
      }
      <Col md={12}>
        {data && data.pages[0].data.length === 0 ? (
          <div
            className="row align-items-center"
            style={{ height: "20vh", width: "100%" }}
          >
            <h6 className="text-center ">Events are not active currently</h6>
          </div>
        ) : (
          <>
            {data.pages.map((data) => (
              <div className="d-flex flex-wrap gap-4 mt-4">
                {data.data.map((event) => (
                  <EventCard events={event} />
                ))}
              </div>
            ))}
          </>
        )}
        <div
          ref={(node) => {
            bottomRef.current = node;
          }}
        />
      </Col>
    </Row>
  );
};

export default EventpageContent;

const FilterSection = () => (
  <div className="p-3 border">
    <h5>Property types</h5>
    <Form.Check type="checkbox" label="popular" />
    {/* <Form.Check type="checkbox" label="Hotels" />
      <Form.Check type="checkbox" label="Specialty lodgings" />
      <Form.Check type="checkbox" label="Lodges" /> */}
    {/* <a href="#">Show more</a> */}
    <hr />
    <h5>Sector</h5>
    <Form.Check type="checkbox" label="Technology" />
    <Form.Check type="checkbox" label="Openings" />
    {/* Add more filters as needed */}
  </div>
);
