import React from 'react';
import { axiosInstance } from '../..';
import { baseURL } from '../../config/config';

const SmallPreview = ({ linkPreview }) => {


    async function handleRedirection() {
        // Open a blank tab immediately
        const newWindow = window.open('about:blank', '_blank');
        try {
            const response = await axiosInstance.post(`${baseURL}auth/code/generate/`);
            if (response.status === 200) {
                const url = `${linkPreview.link}?redirect=true&&code=${response.data.data.auth_code}`;
                newWindow.location.href = url;
            } else {
                newWindow.location.href = linkPreview.link;
            }
        } catch (err) {
            newWindow.location.href = linkPreview.link;
        }
    }




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
                    {/* <p href={linkPreview.url} target="_blank" rel="noopener noreferrer"> */}
                        <button className="visit-site-button" onClick={handleRedirection} >Visit Site</button>
                    {/* </p> */}
                </div>
            </div>
        </div>
    );
};

export default SmallPreview;
