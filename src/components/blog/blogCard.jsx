import React from 'react';

const BlogCard = ({ image, title, description, date }) => {
    return (
        <div className="blog-card" style={{cursor:"pointer"}}>
            {/* Conditionally render image if available */}
            {image && <img src={image} alt="Blog Post" />}

            <div className="content">
                <div className="title text-dynamic-white">{title}</div>
                <div className="description">{description}</div>
                <div className="date">Published on: {date}</div>
            </div>
        </div>
    );
};

export default BlogCard;
