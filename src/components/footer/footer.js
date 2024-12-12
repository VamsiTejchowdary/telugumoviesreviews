// src/components/Footer.js

import React from "react";
import "./footer.css"; // Import the footer CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Movie Lovers. All Rights Reserved</p>
                <p>Made with ❤️ by TFI Lover</p>
                <div className="social-icons">
                    <a
                        href="https://www.instagram.com/telugufilminsights/profilecard/?igsh=Z2pkeXl2Y2cxOXRi"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="social-link"
                    >
                        <span className="social-text">Follow us on </span>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                            alt="Instagram"
                            className="social-icon"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;