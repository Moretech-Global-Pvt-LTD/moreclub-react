import {GetURL} from "./utility"; // Assuming the URL-getting function is in GetURL.js
import { axiosInstance } from "..";
import { baseURL } from "../config/config";
import { getAccessToken } from "./token";

async function handleRedirection(platform, path) {


  const baseLink = GetURL(platform);

  // Adjust the base link based on the country code and additional parameters
  let redirectLink = baseLink;

  if (path) {
    redirectLink = `${baseLink}${path}`;
  }

  // Open a blank tab immediately to avoid popup blockers
  const newWindow = window.open("about:blank", "_blank");
  if(getAccessToken()){
    try {
      const response = await axiosInstance.post(`${baseURL}auth/code/generate/`);
      if (response.status === 200) {
        const url = `${redirectLink}?redirect=true&&code=${response.data.data.auth_code}`;
        newWindow.location.href = url;
      } else {
        newWindow.location.href = redirectLink;
      }
    } catch (err) {
      newWindow.location.href = redirectLink;
    }
  }else{
    newWindow.location.href = redirectLink;
  }
}

export default handleRedirection;
