import React from "react";
import Error from "../../images/error.png"
import { useQueryClient } from "@tanstack/react-query";

const UniversalErrorbox = ({
  message = "Something went wrong while fetching the data.",
  retry,
}) => {

    const queryClient = useQueryClient();

    const handleRefresh = () => {
      queryClient.invalidateQueries({
        queryKey: retry,
      });
    };

  return (
    <div className="universal-errorbox-container">
        <img
        src={Error}
        alt="Error Icon"
        className="error-handler-icon"
      />
      <h1 className="error-handler-title">Oops !</h1>
      <p className="error-handler-message">
      {message}
      </p>
      {retry && (
        <button
          onClick={handleRefresh}
          className="universal-errorbox-retry-button"
        >
          Retry
        </button>
       )}
    </div>
  );
};

export default UniversalErrorbox;
