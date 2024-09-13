import React from 'react';
import { Placeholder } from 'react-bootstrap';

const CardSkeleton = () => {
    return (
        <div className="feed-card">
            {/* Feed Header */}
            <div className="feed-header">
                {/* Skeleton for Profile Pic */}
                <div className="profile-pic">
                    <Placeholder as="div" animation="wave">
                        <Placeholder className="rounded-circle" style={{ width: 40, height: 40 }} />
                    </Placeholder>
                </div>

                {/* Skeleton for User Info */}
                <div className="feed-user-info">
                    <Placeholder as="span" animation="wave">
                        <Placeholder xs={6} className="feed-user-name" />
                    </Placeholder>
                    <Placeholder as="span" animation="wave">
                        <Placeholder xs={4} className="feed-post-time" />
                    </Placeholder>
                </div>
            </div>

            {/* Feed Content */}
            <div className="feed-content">
                {/* Skeleton for Text */}
                <Placeholder as="p" animation="wave">
                    <Placeholder xs={12} />
                    <Placeholder xs={10} />
                    <Placeholder xs={8} />
                </Placeholder>

                {/* Skeleton for Media */}
                <Placeholder as="div" animation="wave">
                    <Placeholder className="feed-media-content" style={{ width: '100%', height: 300 }} />
                </Placeholder>
            </div>

            {/* Feed Actions */}
            <div className="feed-actions">
                <Placeholder as="div" animation="wave" className="feed-action-btn" style={{ width: 80 }}>
                    <Placeholder.Button variant="light" xs={12} />
                </Placeholder>
                <Placeholder as="div" animation="wave" className="feed-action-btn" style={{ width: 80 }}>
                    <Placeholder.Button variant="light" xs={12} />
                </Placeholder>
                <Placeholder as="div" animation="wave" className="feed-action-btn" style={{ width: 80 }}>
                    <Placeholder.Button variant="light" xs={12} />
                </Placeholder>
            </div>
        </div>
    );
};


const FeedCardSkeleton = () => {
  return (
      <div className="d-flex flex-column">
          {Array.from({ length: 5 }).map((_, index) => (
              <CardSkeleton key={index} />
          ))}
      </div>
  )
}

export default FeedCardSkeleton


