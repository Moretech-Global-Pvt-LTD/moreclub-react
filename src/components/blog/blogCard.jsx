import React from 'react';
import { Link } from 'react-router-dom';
import { hostURL } from '../../config/config';

import moment from 'moment';

const BlogCard = ({ slug, image, title, description, date }) => {
    return (
        <Link to={`${hostURL}/blog/detail/${slug}`} className="blog-card card mx-0 my-2" style={{cursor:"pointer"}} >
            {/* Conditionally render image if available */}
            {image && <img src={image} alt="Blog Post" />}

            <div className="content">
                <div className="title text-dynamic-white">{title}</div>
                <div className="description">{description}</div>
                <div className="date">Published on: {moment(date).format('MMM DD YYYY')}</div>
            </div>
        </Link>
    );
};

export default BlogCard;
