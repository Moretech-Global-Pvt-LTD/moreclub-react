import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from "react";
import CarouselEventCard from "../cards/CarouselEventCard";

const EventCarousel = ({ data }) => {
  const responsive = {
   
    xxxxlDesktop: {
      breakpoint: { max: 4000, min: 1900 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 70,
    },
    xxxlDesktop: {
      breakpoint: { max: 1900, min: 1700 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 70,
    },
    xxlDesktop: {
      breakpoint: { max: 1900, min: 1700 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    xlDesktop: {
      breakpoint: { max: 1700, min: 1500 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 70,
    },

    largedesktop: {
      breakpoint: { max: 1500, min: 1200 },
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
      containerClass="ms-3 pb-4 w-full"
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
        "xxxxlDesktop",
        "xxxlDesktop",
        "xxlDesktop",
        "xlDesktop",
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
