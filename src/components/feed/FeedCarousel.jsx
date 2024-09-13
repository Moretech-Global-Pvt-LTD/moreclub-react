import React, { useEffect, useRef, useState } from 'react';
import FeedImageCarousel from './FeedImageCarousel';
import FeedLinkPreview from './FeedLinkPreview';


const FeedMediaCarousel = ({ media }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselIntervalRef = useRef(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === media.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? media.length - 1 : prevIndex - 1
        );
    };

    const startAutoScroll = () => {
        carouselIntervalRef.current = setInterval(handleNext, 8000); // Change slide every 8 seconds
    };

    const stopAutoScroll = () => {
        if (carouselIntervalRef.current) {
            clearInterval(carouselIntervalRef.current);
        }
    };

    useEffect(() => {
        startAutoScroll();

        return () => {
            stopAutoScroll();
        };
    }, [media]);

    const renderDots = () => {
        const maxDots = 5;
        const totalMedia = media.length;

        if (totalMedia <= maxDots) {
            return media.map((_, index) => (
                <span
                    key={index}
                    className={`feed-dot ${index === currentIndex ? 'feed-active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                ></span>
            ));
        } else {
            let start = Math.max(0, currentIndex - Math.floor(maxDots / 2));
            let end = start + maxDots;

            if (end > totalMedia) {
                end = totalMedia;
                start = end - maxDots;
            }

            return media.slice(start, end).map((_, index) => {
                const actualIndex = start + index;
                return (
                    <span
                        key={actualIndex}
                        className={`feed-dot ${actualIndex === currentIndex ? 'feed-active' : ''}`}
                        onClick={() => setCurrentIndex(actualIndex)}
                    ></span>
                );
            });
        }
    };

    return (
        <div
            className="feed-media-carousel"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
        >
            <div className="feed-media-container">
                <FeedImageCarousel media={media[currentIndex]} currentIndex={currentIndex} />
                {/* {media && media.type === 'image' && <FeedImageCarousel media={media[currentIndex]} currentIndex={currentIndex} />}
                
                {media && media.type === 'link' && <FeedLinkPreview linkPreview={media.link_preview} />} */}

            </div>

            <button className="feed-prev" onClick={handlePrev}>
                &#10094;
            </button>
            <button className="feed-next" onClick={handleNext}>
                &#10095;
            </button>

            <div className="feed-indicator">
                {renderDots()}
            </div>
        </div>
    );
};

export default FeedMediaCarousel;
