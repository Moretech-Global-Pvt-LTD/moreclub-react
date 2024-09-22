import { Route, Redirect, Navigate } from "react-router-dom";
import { getAccessToken } from "../../utills/token";

export function ProtectedRoute({ component: Component, ...rest }) {
  function isAuthenticated() {
    // Check if the user is authenticated
    const token = getAccessToken();
    return !!token;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
}
