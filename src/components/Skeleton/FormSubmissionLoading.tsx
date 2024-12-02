import React, { useEffect, useState } from "react";

const FormSubmissionLoading = () => {
  const phrases = ["Loading", "Please wait...", "Almost there..."];
  const [currentText, setCurrentText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < phrases[phraseIndex].length) {
        setCurrentText((prev) => prev + phrases[phraseIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === phrases[phraseIndex].length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phrases, phraseIndex]);

  return (
    <div className="loading-container">
      <span className="loading-text">{currentText}</span>
    </div>
  );
};

export default FormSubmissionLoading;
