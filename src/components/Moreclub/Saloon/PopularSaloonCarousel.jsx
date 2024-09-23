import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Col } from 'react-bootstrap';
import SaloonCard from './SaloonCard';
import { moresaloonhostURL } from '../../../config/config';

const PopularSaloonCarousel = ({ data }) => {
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
            partialVisibilityGutter={true}
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

            {data.slice(0, 10).map((item) => (
                <Col key={item.id} className="d-flex flex-column flex-grow-1 rounded-3 restaurantCard position-relative">
                    <SaloonCard key={item.id} sal={item} link={`${moresaloonhostURL}/saloon/${item.id}`} />
                </Col >
            ))}
        </Carousel>
    );

}

export default PopularSaloonCarousel