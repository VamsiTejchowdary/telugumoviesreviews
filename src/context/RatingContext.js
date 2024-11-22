// RatingContext.js
import React, { createContext, useContext, useState } from "react";

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");  // State to store the review

  return (
    <RatingContext.Provider value={{ rating, setRating, review, setReview }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => useContext(RatingContext);