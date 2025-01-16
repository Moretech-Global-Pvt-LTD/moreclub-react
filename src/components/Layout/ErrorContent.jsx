import React from 'react';
import Error from "../../images/error.png"
const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="error-handler-container">
      <img
        src={Error}
        alt="Error Icon"
        className="error-handler-icon"
      />
      <h1 className="error-handler-title">Something Went Wrong!</h1>
      <p className="error-handler-message">
        We couldn’t complete your request. It might be a network issue. Please
        try refreshing the page.
      </p>
      <button
        className="error-handler-button"
        onClick={handleRefresh}
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorPage;
