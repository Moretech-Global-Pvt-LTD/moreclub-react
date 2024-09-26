import React, { useEffect, useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, addReply, fetchComments } from '../../redux/slices/commentsSlice';
import moment from "moment"
import { toast } from 'react-toastify';
import { message } from 'antd';


const CommentSection = ({ id }) => {
    // State to manage comments and replies


    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments[id] || []);

    const [commentText, setCommentText] = useState('');
    const [cmtIsLoading, setCmtIsLoading] = useState(false);
    const [replyTexts, setReplyTexts] = useState({}); // Store reply text for each comment
    const [replyIsLoading, setReplyIsLoading] = useState({});
    const [activeReplyCommentId, setActiveReplyCommentId] = useState(null); // Track which comment's reply input is active

    useEffect(() => {
        dispatch(fetchComments(id));
    }, [id, dispatch]);


    const handleAddComment = async () => {
        if (commentText.trim()) {
            try {
                setCmtIsLoading(true);
                await dispatch(addComment({ id, body: commentText })).unwrap();

                // Clear the comment text input
                message.success('Comment added successfully');
                setCommentText('');


                toast.success('Comment added successfully');
            } catch (error) {
                console.log(error);
                message.warning('error adding comment');
                // Show error toast
                toast.error('Failed to add comment');
            } finally {
                setCmtIsLoading(false);
            }
        } else {
            message.warning('Comment cannot be empty');
            toast('Comment cannot be empty');
        }
    };


    // Handle adding a reply to a comment
    const handleAddReply = async (commentId) => {
        const replyText = replyTexts[commentId];
        if (replyText.trim()) {
            try {
                setReplyIsLoading({ ...replyIsLoading, [commentId]: true });
                await dispatch(addReply({ id, commentId, reply: replyText })).unwrap();

                // Clear the comment text input
                message.success('Reply added successfully');
                setReplyTexts({ ...replyTexts, [commentId]: '' });


                toast.success('Reply added successfully');
            } catch (error) {
                console.log(error);
                message.warning('error adding reply');
                // Show error toast
                toast.error('Failed to add comment');
            } finally {
                // Reset loading state for this comment's reply
                setReplyIsLoading({ ...replyIsLoading, [commentId]: false });
            }
        } else {
            message.warning('Reply cannot be empty');

        }
    };

    // Handle reply text input change
    const handleReplyTextChange = (commentId, text) => {
        setReplyTexts({ ...replyTexts, [commentId]: text });
    };

    const handleReplyButtonClick = (commentId) => {
        setActiveReplyCommentId(commentId); // Show the reply input only for the clicked comment
    };



    return (
        <div className=" mt-4">
            <h6 className="mb-3">Comments </h6>



            {/* Input for adding new comment */}
            <Form.Group className="mb-3" controlId="addComment">
                <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                {!!Cookies.get("moretechglobal_access") ?
                    <Button className="mt-3" onClick={handleAddComment}>
                        Post Comment
                    </Button> :
                    <Link to="/login">

                        <Button className="mt-3" variant='danger' disabled={cmtIsLoading} >
                            {cmtIsLoading ? "Posting..." : "Login to Post Comment"} Login
                        </Button>
                    </Link>
                }
            </Form.Group>
            {/* Display comments and replies */}
            <div className="comment-list">
                {comments && comments.length > 0 && comments.map((comment) => (
                    <Card key={comment.id} className="mb-3">
                        <Card.Body>
                            {/* Display the commenter's name and the comment date */}
                            <div className="comment-item">
                                <div
                                    src="path/to/profile-image.jpg"
                                    alt="User's profile picture"
                                    className="comment-profile-placeholder"
                                >{comment.user[0]}</div>

                                <div className="comment-details">
                                    <strong className="comment-author text-dynamic-white">{comment.user}</strong>
                                    <small className="comment-date">{moment.utc(comment.created).local().fromNow()}</small>
                                </div>
                            </div>
                            {/* Comment Body */}
                            <span className="text-dynamic-white">{comment.body}</span>

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="ms-4 mt-3">
                                    <h6>Replies:</h6>
                                    {comment.replies.map((reply, index) => (
                                        <div>
                                            <div className="comment-item">
                                                <div
                                                    className="comment-profile-placeholder"
                                                >{reply.user[0]}</div>
                                                <div className="comment-details">
                                                    <strong className="comment-author text-dynamic-white">{reply.user}</strong>
                                                    <small className="comment-date">{moment.utc(reply.created).local().fromNow()}</small>
                                                </div>
                                            </div>
                                            <span className="ms-2 text-dynamic-white">{reply.body}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!!Cookies.get("moretechglobal_access") &&
                                <div
                                    className="mt-2 text-dynamic-white text-secondary ms-3"
                                    onClick={() => handleReplyButtonClick(comment.id)}
                                    style={{ cursor: 'pointer', fontSize: '14px', fontStyle: 'italic' }}
                                >
                                    <i class="bi bi-reply"></i> add your reply
                                </div>}

                            {activeReplyCommentId === comment.id && <>
                                {/* Reply Input */}
                                <Form.Group controlId={`reply-${comment.id}`} className="mt-3 ms-3" >
                                    <Form.Control
                                        as="textarea"
                                        rows={1}
                                        placeholder="Write a reply..."
                                        value={replyTexts[comment.id] || ''} // Bind reply text for each comment
                                        onChange={(e) => handleReplyTextChange(comment.id, e.target.value)}
                                    />
                                    <Button className="mt-2 me-2" variant='secondary' onClick={() => setActiveReplyCommentId(null)} disabled={replyIsLoading[comment.id]}
                                    
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="mt-2" onClick={() => handleAddReply(comment.id)} disabled={replyIsLoading[comment.id]}
                                    >
                                        {replyIsLoading[comment.id] ? 'Posting...' : 'Reply'}
                                    </Button>
                                </Form.Group>
                            </>}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
