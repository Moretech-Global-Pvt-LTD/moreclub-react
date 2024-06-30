
import { baseURL } from "../../config/config";
import { axiosInstance } from "../../index";

export const alertNotification = () => {
    try {
      const res = axiosInstance.get(`${baseURL}notifications/alert/`);
      return res;
    } catch (err) {
      return err.response.data;
    }
  };