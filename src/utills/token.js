import Cookies from "js-cookie";

// Function to set access token in a cookie
export const setAccessToken = (token, expiresInMinutes = 30) => {
  
  Cookies.set("moretechglobal_access", token, {
    expires: expiresInMinutes / 1440, // 30 minutes expiration
    secure: true, // Only sent over HTTPS
    sameSite: "Strict", // Protect from CSRF
  
  });
};
export const setRefressToken = (token, expiresInMinutes = 30) => {
  Cookies.set("moretechglobal_refresh", token, {
    expires: expiresInMinutes / 1440, // 30 minutes expiration
    secure: true, // Only sent over HTTPS
    sameSite: "Strict", // Protect from CSRF

  });
};

// Function to remove access token cookie
export const removeToken = () => {
    Cookies.remove("moretechglobal_refresh");
    Cookies.remove("moretechglobal_access");
};

// Function to get access token from cookies
export const getAccessToken = () => {
  return Cookies.get("moretechglobal_access");
};
