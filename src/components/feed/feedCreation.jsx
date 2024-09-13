import React, { useState } from 'react';
import { Button, Form, Modal, Placeholder } from 'react-bootstrap';
import FeedLinkPreview from './FeedLinkPreview';
import FeedsmallPreview from './FeedsmallPreview';
import { useSelector } from 'react-redux'
import { baseURL } from '../../config/config';
import { axiosInstance } from "../..";
import { message } from 'antd';

const PostCreationForm = () => {
    const user = useSelector((state) => state.userReducer);
    const [postContent, setPostContent] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [textAreaHeight, setTextAreaHeight] = useState('auto');

    const [linkPreview, setLinkPreview] = useState(null); // Store link preview data
    const [cachedPreviews, setCachedPreviews] = useState({});
    const [isReply, setIsReply] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    };

    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const handleTextAreaChange = async (e) => {
        setPostContent(e.target.value);
        setTextAreaHeight(`${e.target.scrollHeight}px`);

        // Extract URLs from the text
        const matchedUrls = e.target.value.match(urlRegex);
        if (matchedUrls && matchedUrls.length > 0) {
            const uniqueUrls = [...new Set(matchedUrls)]; // Remove duplicate URLs
            const previews = [];

            for (const url of uniqueUrls) {
                if (cachedPreviews[url]) {
                    // If the preview for this URL is already cached, use it
                    previews.push(cachedPreviews[url]);
                } else {
                    try {
                        // If it's a new URL, fetch the preview and cache it
                        // const response = await axios.get(`/fetch-link-preview?url=${encodeURIComponent(url)}`);
                        // const previewData = response.data;
                        const preview = {
                            url,
                            title: 'Default Link Preview',
                            description: 'This is a default link preview.',
                        };
                        const previewData = preview;

                        // Add to previews and cache it
                        previews.push(previewData);
                        setCachedPreviews((prevCache) => ({
                            ...prevCache,
                            [url]: previewData, // Cache the result for this URL
                        }));
                    } catch (error) {
                        console.error('Error fetching link preview:', error);
                    }
                }
            }

            setLinkPreview(previews);
        } else {
            setLinkPreview([]);
        }
    };

    // Fetch link preview data (this can be from your backend or an external service)
    const fetchLinkPreview = async (url) => {
        try {
            // Replace with your backend API that fetches metadata for a URL
            const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
            const data = await response.json();
            setLinkPreview(data); // Assuming the response contains title, description, and image
        } catch (error) {
            console.error('Error fetching link preview:', error);
        }
    };


    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setMediaFiles([...mediaFiles, ...files]);
    };

    const removeMedia = (index) => {
        setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            console.log(mediaFiles)

            const formData = {
                caption: postContent,
                file: mediaFiles
            }


            // const formData = new FormData();

            // formData.append('user_id', user.user.id);
            // mediaFiles.forEach((file) => {
            //     formData.append('media', file);
            // });
            axiosInstance.post(`${baseURL}socialmedia/feeds/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                console.log(response.data);
                // setPostContent('');
                // setMediaFiles([]);
                message.success('Post created successfully');
            })
                .catch((error) => {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
        }
    }


    return (



        <>
            <div className="feed-post-creation">
                <div className="post-header">
                    {user?.user?.user_profile?.display_picture ? (
                        <img src={user?.user?.user_profile?.display_picture} alt="Profile" className="profile-pic" />
                    ) : (
                        <div className="profile-pic">{user?.user?.first_name[0]}{user?.user?.last_name[0]}</div>
                    )
                    }
                    <div
                        className="post-textarea "
                        onClick={toggleModal}
                        placeholder="What's on your mind?"
                    >{postContent? postContent : "What's on your mind?"}</div>
                </div>
                <Button
                    variant="primary"
                    onClick={toggleModal}
                    className="mt-4 "
                >
                    {isLoading && (
                        <span className="spinner-border spinner-border-sm text-danger"></span>
                    )}
                    &nbsp;Post
                </Button>
                </div>


                




                
                

                
            
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size="md"
                centered
                show={isModalOpen}
                onHide={toggleModal}

            >

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                        Add a Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="facebook-post-creation">
                        {/* <div className="post-header">
                            {user?.user?.user_profile?.display_picture ? (
                                <img src={user?.user?.user_profile?.display_picture} alt="Profile" className="profile-pic" />
                            ) : (
                                <div className="profile-pic">{user?.user?.first_name[0]}{user?.user?.last_name[0]}</div>
                            )
                            }
                        </div> */}
                            <textarea
                                className="post-textarea"
                                value={postContent}
                                onChange={handleTextAreaChange}
                                style={{ height: textAreaHeight }}
                                placeholder="What's on your mind?"
                            />
                        <div className='d-flex gap-2 align-items-center'>
                            <label>Comment: off/on</label>
                            <Form.Check
                                type="switch"
                                checked={isReply}
                                onChange={() => setIsReply(!isReply)}

                            />
                        </div>


                        <div className='link-preview-scroll-container'>
                            {mediaFiles && mediaFiles.length === 0 && linkPreview && linkPreview.map((linkPreviews, index) => (
                                <FeedLinkPreview linkPreview={linkPreviews} />
                            ))}
                        </div>




                        {/* Media Preview */}
                        <div className="media-preview">
                            {mediaFiles.map((file, index) => (
                                <div className="media-item" key={index}>
                                    {file.type.startsWith('image') ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Uploaded media"
                                            className="media-preview-img"
                                        />
                                    ) : (
                                        <video className="media-preview-img" controls>
                                            <source src={URL.createObjectURL(file)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    {/* Remove button */}
                                    <button className="remove-media-btn" onClick={() => removeMedia(index)}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        {mediaFiles && mediaFiles.length !== 0 && linkPreview && linkPreview.map((linkPreviews, index) => (
                            <FeedsmallPreview linkPreview={linkPreviews} />
                        ))}

                        {/* File Upload */}
                        
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className="post-footer">
                            <input
                                type="file"
                                id="fileUpload"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileUpload}
                                hidden
                            />

                            <label htmlFor="fileUpload" className="file-upload-btn">
                                Upload Photos/Videos
                            </label>

                        </div>
                    <div className='d-flex justify-content-end gap-2'>
                    <Button
                        variant="secondary"
                        onClick={toggleModal}
                        className="mt-4 "
                    >
                        {isLoading && (
                            <span className="spinner-border spinner-border-sm text-danger"></span>
                        )}
                        &nbsp;Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="mt-4 "
                    >
                        {isLoading && (
                            <span className="spinner-border spinner-border-sm text-danger"></span>
                        )}
                        &nbsp;Post
                    </Button>

                    </div>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    );
};

export default PostCreationForm;
