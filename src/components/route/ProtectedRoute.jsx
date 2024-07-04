import { Route, Redirect, Navigate } from "react-router-dom";

export function ProtectedRoute({ component: Component, ...rest }) {
  function isAuthenticated() {
    // Check if the user is authenticated
    const token = sessionStorage.getItem("moretechglobal_access");
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
