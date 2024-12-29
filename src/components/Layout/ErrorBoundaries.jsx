import React from "react";
import DashboardLayout from "./DashboardLayout";
import Cookies from "js-cookie";
import LandingLayout from "./LandingLayout";
import Divider from "../divider/Divider";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state when an error is thrown
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Log error details (optional)
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      if (Cookies.get("moretechglobal_access")) {
        return (
          <DashboardLayout>
            <Divider />
            <h3>Something went wrong.</h3>;
            <Divider />
          </DashboardLayout>
        );
      } else {
        return (
          <LandingLayout>
            <Divider />
            <h3>Something went wrong.</h3>;
            <Divider />
          </LandingLayout>
        );
      }
    }

    // Render children components
    return this.props.children;
  }
}

export default ErrorBoundary;
