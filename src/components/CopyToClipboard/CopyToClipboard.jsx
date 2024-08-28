import { useState, useRef } from "react";
import "./CopyToClipboard.css";

const CopyToClipboard = ({ copyText }) => {
  const [isCopied, setIsCopied] = useState(false);
  const tooltipRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500); // Adjust tooltip duration as needed
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  return (
    <div onClick={handleCopy} className="clipboard-container">
      <h3 style={{ display: "inline", marginRight: "10px" }}>
        Room ID: {copyText}
      </h3>
      <i className="far fa-clipboard" style={{ cursor: "pointer" }}></i>
      <div ref={tooltipRef} className={`tooltip ${isCopied ? "show" : ""}`}>
        Copied!
      </div>
    </div>
  );
};

export default CopyToClipboard;
