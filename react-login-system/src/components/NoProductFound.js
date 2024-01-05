import React from "react";
import "../styles/notfound.css";

const NoProductFound = () => {
  return (
    <div className="no-result-found">
      <h1>No Result Found</h1>
      <p>
        Sorry, but the results you were looking for were not found. Try using a
        different search query or method.
      </p>
    </div>
  );
};

export default NoProductFound;
