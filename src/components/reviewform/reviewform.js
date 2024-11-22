import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./reviewform.css";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    moviename: "",
    review: "",
    instaid: "",
  });
  const [rating, setRating] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isTelugu, setIsTelugu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRatingSelected, setIsRatingSelected] = useState(true); // Default true, meaning rating is selected
  const [isShaking, setIsShaking] = useState(true); // Track if the text should shake

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
    setIsRatingSelected(true); // Reset the error when rating is selected
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Check if rating is selected
    if (rating === 0) {
      setIsRatingSelected(false); // Show error message
      return; // Prevent form submission
    }

    setIsSubmitting(true); // Disable the button immediately after click

    const formSubmissionData = {
      user_name: formData.name,
      user_email: formData.email,
      moviename: formData.moviename,
      rating: rating,
      review: formData.review,
      instaid: formData.instaid,
    };

    try {
      const res = await emailjs.send(
        "service_5ltgdc8", // Replace with your service ID
        "template_i2hcltt", // Replace with your template ID
        formSubmissionData,
        "aRWwlSFOde2kvNqWc" // Replace with your public key
      );

      if (res.text === "OK") {
        setStatusMessage(
          isTelugu
            ? "మీ సినిమా సమీక్షను పంచుకున్నందుకు ధన్యవాదాలు! 🎬🍿 మీ సమీక్ష మీను లాటరీ గెలుచుకోవడానికి దగ్గర చేస్తుందని ఆశిస్తున్నాము! 💰🍀✨"
            : "Thanks for sharing your movie review! 🎬🍿 Best of luck – may your review bring you closer to winning the lottery! 💰🍀✨"
        );
        setFormData({
          name: "",
          email: "",
          moviename: "",
          review: "",
          instaid: "",
        });
        setRating(0);
      } else {
        setStatusMessage("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Error: Could not submit form. Please try again later.");
    } finally {
      setIsSubmitting(false); // Enable button after submission is processed
    }
  };

  const handleLanguageClick = () => {
    setIsTelugu(!isTelugu);
    setIsShaking(false); // Stop shaking when clicked
  };

  useEffect(() => {
    // After 3 seconds, stop the shaking effect
    const timer = setTimeout(() => {
      setIsShaking(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="review-form-wrapper">
      <div className="review-form">
        <div className="language-toggle">
          <label
            className={`toggle-text ${isShaking ? "shaking" : ""}`}
            onClick={handleLanguageClick}
          >
            {isTelugu ? "Translate to English" : "తెలుగులోకి అనువదించండి"}
          </label>
        </div>
        <h2>{isTelugu ? "మీ సమీక్షను సమర్పించండి" : "Submit Your Review"}</h2>
        <p className="info-text">
          {isTelugu
            ? "ఈ సమీక్షను సమర్పించడం ద్వారా మీరు సినిమాకు టికెట్ లాటరీలో పాల్గొనడమే కాకుండా మీ సమీక్ష కూడా "
            : "By submitting this review, you will not only be entered into the lottery for a movie ticket but your review will also be considered for the "}
          <span className="highlighted-text">
            {isTelugu ? "TFI మీటర్ ★" : "TFI Meter ★"}
          </span>
          {isTelugu ? " కోసం పరిగణించబడుతుంది " : ""}
        </p>

        {statusMessage && <p className="review-status">{statusMessage}</p>}

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={isTelugu ? "మీ పేరు" : "Your Name"}
            required
            className="review-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={isTelugu ? "మీ ఇమెయిల్" : "Your Email"}
            required
            className="review-input"
          />
          <input
            type="instaid"
            name="instaid"
            value={formData.instaid}
            onChange={handleChange}
            placeholder={
              isTelugu
                ? "ఇన్స్టాగ్రామ్ ఐడీ టికెట్లు కోసం ప్రత్యక్ష సంప్రదింపులు (ఐచ్ఛికం)"
                : "Instagram Id for direct contact (optional)"
            }
            className="review-input"
          />
          <input
            name="moviename"
            value={formData.moviename}
            onChange={handleChange}
            placeholder={
              isTelugu
                ? "మీరు సమీక్షించాలనుకున్న చిత్రం"
                : "Which movie would you like to review?"
            }
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
                  ★
                </span>
              ))}
            </div>
            {!isRatingSelected && (
              <div className="error-message" style={{ color: "red" }}>
                Rating is required.
              </div>
            )}
          </div>

          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder={
              isTelugu
                ? "ఈ చిత్రంపై మీ అభిప్రాయం చెప్పండి"
                : "What did you enjoy/hate most about the movie?"
            }
            className="review-textarea"
          ></textarea>

          <button
            type="submit"
            className={`review-submit-btn ${
              isSubmitting ? "disabled-btn" : ""
            }`}
            disabled={isSubmitting} // Disable button during submission
          >
            {isTelugu ? "సమర్పించండి" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;