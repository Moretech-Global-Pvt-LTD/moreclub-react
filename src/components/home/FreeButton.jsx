import React from "react";

const FreeButton = () => {
  return (
    <a href="/login">
      <div className="bg-danger px-1 py-2 ">
        <h5 className="text-white text-center">TRY FOR FREE</h5>
        <p className="fw-thin text-white text-center my-0">
          TAKE YOUR BUSINESS TO NEXT LEVEL
        </p>
      </div>
    </a>
  );
};

export default FreeButton;
