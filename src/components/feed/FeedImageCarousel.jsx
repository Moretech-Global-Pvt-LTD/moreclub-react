import React from 'react'
import { Placeholder } from 'react-bootstrap'

const FeedImageCarousel = ({media , currentIndex}) => {
  return (
    <img
      src={media?.file} // Ensure media[currentIndex] is valid
      alt={`Media ${currentIndex}`}
      className="feed-media-content"
    />
  )
}

export default FeedImageCarousel