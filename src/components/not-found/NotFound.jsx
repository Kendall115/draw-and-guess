import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Ensure you create this CSS file.

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found-title">404 - Room ID Not Found</h1>
      <p className="not-found-message">
        Sorry, the room ID you entered does not exist.
      </p>
      <Link to="/" className="not-found-home-link">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
