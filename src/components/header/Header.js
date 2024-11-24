import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isRotating, setIsRotating] = useState(false); // Track rotation state
  //const [isLotteryPopupOpen, setIsLotteryPopupOpen] = useState(false); // Lottery popup state

  // Show the lottery popup after 3 seconds
  // useEffect(() => {
    // const timer = setTimeout(() => {
    //   setIsLotteryPopupOpen(true);
    // }, 3000);

  //   return () => clearTimeout(timer); // Clean up the timer on unmount
  // }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleContactForm = (e) => {
    e.preventDefault();
    setIsContactFormOpen(!isContactFormOpen);
    setStatusMessage(""); // Reset the status message when the form is closed
    setIsMenuOpen(false); // Close the menu when contact form is opened
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    
      await addDoc(collection(db, "contacts"), {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date(), // Optionally add a timestamp
    });

    const formSubmissionData = {
      ...formData,
      access_key: "714a788b-41d0-4552-a16b-ff07ab282e6e", // Replace with your Web3Forms access key
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
          "Thank you for your message! We'll get back to you soon."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatusMessage("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Error: Could not submit form. Please try again later.");
    }
  };

  const handleLogoClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1000); // Reset rotation after animation
  };

  // const handleLotteryClose = () => {
  //   setIsLotteryPopupOpen(false);
  // };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/" onClick={handleLogoClick}>
          <img
            className={`header__icon ${isRotating ? "rotating" : ""}`}
            src="/finaltfilogo.png"
            alt="Logo"
          />
        </Link>
      </div>
      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {/* Dropdown Menu */}
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <Link
          to="/movies/Insights"
          style={{ textDecoration: "none" }}
          onClick={() => setIsMenuOpen(false)}
        >
          <span>TFInsights</span>
        </Link>
        <Link
          to="/movies/reviewform"
          style={{ textDecoration: "none" }}
          onClick={() => setIsMenuOpen(false)}
        >
          <span>Review Form</span>
        </Link>
        <Link
          to="/movies/popular"
          style={{ textDecoration: "none" }}
          onClick={() => setIsMenuOpen(false)}
        >
          <span>Popular</span>
        </Link>
        <Link
          to="/movies/upcoming"
          style={{ textDecoration: "none" }}
          onClick={() => setIsMenuOpen(false)}
        >
          <span>Upcoming</span>
        </Link>
        <Link
          to="#"
          onClick={toggleContactForm}
          style={{ textDecoration: "none" }}
        >
          <span>Contact</span>
        </Link>
      </div>

      {/* Contact Form */}
      {isContactFormOpen && (
        <div className="contact-form-overlay">
          <div className="contact-form">
            <h2>Contact Us</h2>
            {statusMessage && <p>{statusMessage}</p>}
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
            <button className="close" onClick={toggleContactForm}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;