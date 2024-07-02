import React from "react";

const Content = ({ priv }) => {
  // Clean up any escape sequences or unnecessary characters
  const cleanedDescription = priv
    .replace(/\r\n/g, "<br/>")
    .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

  return (
    <div
      className="content-container text-dynamic-white"
      dangerouslySetInnerHTML={{ __html: cleanedDescription }}
    />
  );
};

export default Content;
