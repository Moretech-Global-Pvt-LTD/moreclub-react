import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  notifications: [],
  unreadCount: 0,
  error: null,
  hasNextPage: true,
  currentPage: 0,
  checkForUpdate: false,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },
    fetchNotificationsSuccess: (state, { payload }) => {
      const uniqueNewNotifications = payload.notifications.filter(
        (newNotification) =>
          !state.notifications.some(
            (existingNotification) =>
              existingNotification.id === newNotification.id
          )
      );

      state.notifications = [...uniqueNewNotifications, ...state.notifications, ];
      state.unreadCount = payload.notifications.filter(
        (n) => !n.is_read
      ).length;
      state.hasNextPage = payload.hasNextPage;
      state.currentPage = 1;
      state.checkForUpdate = true;
    },

    fetchNextPageSuccess: (state, { payload }) => {
      const uniqueNotifications = payload.notifications.filter(
        (newNotification) =>
          !state.notifications.some(
            (existingNotification) =>
              existingNotification.id === newNotification.id
          )
      );
      // Append only the unique notifications to the existing list
      state.notifications = [...state.notifications, ...uniqueNotifications];
      state.unreadCount = state.notifications.filter((n) => !n.is_read).length;
      state.hasNextPage = payload.hasNextPage;
      state.currentPage += 1;
    },
    addNewNotifications: (state, { payload }) => {
      // Add new notifications to the front of the list
      const newNotifications = payload.notifications.filter(
        (newNotification) =>
          !state.notifications.some(
            (existingNotification) =>
              existingNotification.id === newNotification.id
          )
      );

      const audio = new Audio("./audio/ui-bell-ding.mp3");

      state.notifications = [...newNotifications, ...state.notifications];
      state.unreadCount += newNotifications.filter((n) => !n.is_read).length;
      newNotifications.forEach((notif) => {
        audio.play();
        toast.info(`${notif.title}: ${notif.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      }));
      state.unreadCount = 0;
    },
  },
});

export const {
  setLoading,
  fetchNotificationsSuccess,
  fetchNextPageSuccess,
  addNewNotifications,
  setError,
  markAllAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;