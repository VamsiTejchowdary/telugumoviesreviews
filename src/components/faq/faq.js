import React, { useState } from "react";
import "./faq.css";
import Footer from "../../components/footer/footer";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Telugu Film Insights?",
      answer:
        "Telugu Film Insights (TFI) is your ultimate destination for Telugu cinema lovers, offering movie reviews, updates, and free movie tickets to make your entertainment journey unforgettable",
    },
    {
      question: "What is the TFI Meter?",
      answer:
        "The TFI Meter is a dynamic rating system that reflects user-submitted reviews. It updates automatically based on the feedback and ratings provided by our community of movie enthusiasts",
    },
    {
      question: "How can I get free movie tickets?",
      answer:
        " Simply participate by submitting your reviews as a TFInsider. Each review you share enters you into our free ticket lottery!",
    },
    {
      question: "What if I don’t win the giveaway?",
      answer:
        "If you don’t win, submit a review for the next giveaway to increase your chances. Each review for giveaway adds an extra entry, and your chances build up for up to five giveaways. Submitting reviews for every giveaway is key!"   },
        {
            question: "Can I follow TFI on Social media?",
            answer: (
              <span>
                Yes! Follow us on Instagram{" "}
                <a href="https://www.instagram.com/Telugufilminsights" target="_blank" rel="noopener noreferrer">
                  @Telugufilminsights
                </a>{" "}
                to stay updated on giveaways, reviews, and the latest happenings in Tollywood.
              </span>
            ),
        },
  ];

  return (
    <div className="faq-wrapper">
      <div className="faq-card">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className={`faq-question ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-arrow">
                  {activeIndex === index ? "▲" : "▼"}
                </span>
              </div>
              <div
                className={`faq-answer ${
                  activeIndex === index ? "visible" : ""
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div><Footer/></div>
      </div>
  );
};

export default FAQ;
