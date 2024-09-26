import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommentsApi,
  postCommentApi,
  postReplyApi,
} from "../api/commentsApi";


// Thunk to fetch comments for a specific post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId, { rejectWithValue }) => {
    try {
      const comments = await fetchCommentsApi(postId);
      return { postId, comments };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add a new comment to the post
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const newComment = await postCommentApi(id, body);
      return {id, newComment }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add a reply to a specific comment
export const addReply = createAsyncThunk(
  "comments/addReply",
  async ({ id, commentId, reply }, { rejectWithValue }) => {
    try {
     
      const newReply = await postReplyApi(id, commentId, reply);
      return { id, commentId, reply:newReply };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Comments Slice
const commentsSlice = createSlice({
  name: "comments",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state[postId] = comments;
      })
      // Add a new comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { id, newComment } = action.payload;
        state[id].push(newComment);
      })
      // Add a reply to a comment
      .addCase(addReply.fulfilled, (state, action) => {
        const { id, commentId, reply } = action.payload;
        
       
        const comment = state[id].find((c) => c.id === commentId);
        if (comment) {
          comment.replies.push(reply);
        }
      });
  },
});

export default commentsSlice.reducer;
