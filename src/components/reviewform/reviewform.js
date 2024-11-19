import React, { useState } from "react";
import "./reviewform.css";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    moviename: "",
    review: "",
  });
  const [rating, setRating] = useState(0); // State for star rating
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formSubmissionData = {
      ...formData,
      rating, // Include rating in submission
      access_key: "d99c2fc0-25ab-446c-af36-42741b91479e",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formSubmissionData),
      });

      const result = await res.json();

      if (result.success) {
        setStatusMessage(
          "Thanks for sharing your movie review! 🎬🍿 Best of luck – may your review bring you closer to winning the lottery! 💰🍀✨"
        );
        setFormData({
          name: "",
          email: "",
          moviename: "",
          review: "",
        });
        setRating(0); // Reset rating
      } else {
        setStatusMessage("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Error: Could not submit form. Please try again later.");
    }
  };

  return (
    <div className="review-form-wrapper">
      <div className="review-form">
        <h2>Submit Your Review</h2>
        <p className="info-text">
          By submitting this review, you will not only be entered into the
          lottery for a movie ticket but your review will also be considered for
          the&nbsp;
          <span className="highlighted-text">TFI Meter&nbsp;★</span>
        </p>
        {statusMessage && <p className="review-status">{statusMessage}</p>}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="review-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="review-input"
          />
          <input
            name="moviename"
            value={formData.moviename}
            onChange={handleChange}
            placeholder="Movie Name"
            required
            className="review-input"
          />

          <div className="rating-wrapper">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? "selected" : ""}`}
                  onClick={() => handleStarClick(star)}
                >
                  &nbsp; ★
                </span>
              ))}
            </div>
          </div>

          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="What did you enjoy/hate most about the movie?"
            className="review-textarea"
          ></textarea>
          <button type="submit" className="review-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
