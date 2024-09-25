import React from 'react'
import CommentSection from './Comment';
import moment from "moment";

const BlogDetail = ({ data }) => {




    return (
        <div className="blog-detail-content">
            <h1 className="blog-detail-title">{data.title}</h1>
            <div className="blog-detail-image">
                <img src={data.image} alt="Blog Post" />
            </div>
            <div className="blog-detail-description" dangerouslySetInnerHTML={{ __html: data.body }}/>
               

            <div className="blog-detail-footer">
                <p className="blog-detail-posted">
                    Posted on <span>{moment(data.publish).format('MMM DD YYYY')}</span> by <span>{data?.author?? "More Deals Club"}</span>
                </p>
            </div>
            <CommentSection  id={data.id}/>
        </div>
    )
}

export default BlogDetail