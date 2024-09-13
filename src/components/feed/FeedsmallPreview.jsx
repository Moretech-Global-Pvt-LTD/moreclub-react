import React from 'react';

const FeedsmallPreview = ({ linkPreview }) => {
    return (
        <div className="small-link-preview">
            {linkPreview.image ? (
                <img
                    src={linkPreview.image}
                    alt={linkPreview.title}
                    className="small-link-preview-image"
                />
            ) : (
                <div className="small-link-placeholder"></div>
            )}

            <div className="small-link-preview-info">
                <h6 className="small-link-preview-title">{linkPreview.title}</h6>
                <p className="small-link-preview-description">{linkPreview.description}</p>
                <div className="small-link-preview-actions">
                    <a href={linkPreview.url} target="_blank" rel="noopener noreferrer">
                        <button className="visit-site-button">Visit Site</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeedsmallPreview;
