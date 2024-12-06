import React from 'react'
import FeedMediaCarousel from './FeedCarousel'


const FeedCard = ({ post }) => {

   
    return (
        <div>
            <div className="feed-card">
                <div className="feed-header">
                    {/* <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="profile-pic"
                  /> */}
                    <div className="profile-pic"
                    >{post?.user?.first_name[0]} {post?.user?.last_name[0]}</div>
                    <div className="feed-user-info">
                        <span className="feed-user-name">{post?.user?.first_name} {post?.user?.last_name}</span>
                        <span className="feed-post-time">2 hrs ago</span>
                    </div>
                </div>

                <div className="feed-content">
                    <p className="post-text">
                        {post.caption}
                    </p>

                    {post.media_url && post.media_url.length === 1 &&
                        <img
                            src={post.media_url[0].file}
                            alt="Post"
                            className="feed-media-content"
                        />}
                    {post.media_url && post.media_url.length > 1 &&
                        <FeedMediaCarousel media={post.media_url} />}
                </div>

                 <div className="feed-reactions">
        <div className="reactions-summary">
            <span className="reaction-icon">&#x1F44D;</span> {/* Thumbs Up Emoji as Example */}
            <span className="reaction-count">1.7K</span>
        </div>
        <div className="comments-summary">
            <span>92 Comments</span>
            <span>42 Shares</span>
        </div>
    </div>

    {/* Feed Actions */}
    <div className="feed-actions">
        <div className="feed-action-btn">
            <span className="action-icon">&#x1F44D;</span> {/* Thumbs Up Icon */}
            <span>Like</span>
        </div>
        <div className="feed-action-btn">
            <span className="action-icon">&#x1F4AC;</span> {/* Comment Icon */}
            <span>Comment</span>
        </div>
        <div className="feed-action-btn">
            <span className="action-icon">&#x1F4E4;</span> {/* Share Icon */}
            <span>Share</span>
        </div>
    </div>
            </div>

        </div>
    )
}



export default FeedCard;