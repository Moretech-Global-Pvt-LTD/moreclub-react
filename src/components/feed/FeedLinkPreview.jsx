import React from 'react'
import { Placeholder } from 'react-bootstrap'

const FeedLinkPreview = ({ linkPreview }) => {
  return (
      <div className="link-preview">

          {linkPreview.image ? (

              <img src={linkPreview.image} alt={linkPreview.title} className="link-preview-image" />
          ) :
              <Placeholder className="link-preview-image" />
          }

          <div className="link-preview-info">
              <h6 className="link-preview-title">{linkPreview.title}</h6>
              <p className="link-preview-description">{linkPreview.description}</p>
              <a href={linkPreview.url} target="_blank" rel="noopener noreferrer">
                  {linkPreview.url}
              </a>
          </div>

      </div>
  )
}

export default FeedLinkPreview