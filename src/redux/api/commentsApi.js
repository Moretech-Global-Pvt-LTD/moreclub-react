import axios from "axios";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

// commentsApi.js

// Fetch comments for a specific post
export const fetchCommentsApi = async (postId) => {
  try {
    const response = await axios.get(
      `${baseURL}blogs/${postId}/comments/list/`
    );
    return response.data.data; // Axios automatically parses JSON
  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
};

// Post a new comment to a specific post
export const postCommentApi = async (postId, body) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}blogs/${postId}/comments/list/`,
      { body: body }
    );

    return response.data.data; // Return the posted comment data
  } catch (error) {
    throw new Error("Failed to post comment");
  }
};

// Post a reply to a specific comment
export const postReplyApi = async (postId, commentId, reply) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}blogs/${postId}/comments/list/`,
      {
        body: reply,
        reply_to: commentId,
      }
    );
    return response.data.data; // Return the posted reply data
  } catch (error) {
    throw new Error("Failed to post reply");
  }
};
