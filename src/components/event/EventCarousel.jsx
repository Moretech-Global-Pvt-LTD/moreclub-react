import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import EventCard from "../cards/Eventcard";
import CarouselEventCard from "../cards/CarouselEventCard";

const EventCarousel = ({ data }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      //   partialVisibilityGutter: 40 ,
    },
    tablet: {
      breakpoint: { max: 1200, min: 992 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 70,
    },
    tablete: {
      breakpoint: { max: 992, min: 768 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    tablets: {
      breakpoint: { max: 768, min: 600 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 170,
    },
    mobile: {
      breakpoint: { max: 600, min: 576 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 200,
    },
    mobiles: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 70,
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
      removeArrowOnDeviceType={["tablets", "tablet", "mobile", "desktop"]}
    >
      {data?.data?.slice(0, 9).map((event) => (
        <CarouselEventCard key={event} events={event} />
      ))}
    </Carousel>
  );
};

export default EventCarousel;
