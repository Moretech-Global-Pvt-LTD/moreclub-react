import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import EventCard from "../cards/Eventcard";
import CarouselEventCard from "../cards/CarouselEventCard";

const EventCarousel = ({ data }) => {
  const responsive = {
    largedesktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mediumDesktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 70,
    },
    smallDesktop: {
      breakpoint: { max: 992, min: 768 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    largetablets: {
      breakpoint: { max: 768, min: 600 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 170,
    },
    mediumtablets: {
      breakpoint: { max: 600, min: 576 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 200,
    },
    smalltablets: {
      breakpoint: { max: 576, min: 480 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 70,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      containerClass="ms-3 pb-4"
      itemClass=""
      autoPlay={true}
      transitionDuration={5000}
      swipeable={true}
      draggable={true}
      showDots={true}
      dotListClass={"mt-4"}
      infinite={true}
      partialVisbile={true}
      removeArrowOnDeviceType={[
        "largedesktop",
        "mediumDesktop",
        "smallDesktop",
        "largetablets",
        "mediumtablets",
        "smalltablets",
        "mobile",
      ]}
    >
      {data?.data?.slice(0, 9).map((event) => (
        <CarouselEventCard key={event} events={event} />
      ))}
    </Carousel>
  );
};

export default EventCarousel;
