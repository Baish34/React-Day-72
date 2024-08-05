import React, { useState } from "react";

// Food Survey App Component
function FoodSurveyApp() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      question: "Which type of cuisine do you prefer?",
      options: {
        Asian: ["Chinese", "Japanese", "Indian"],
        European: ["Italian", "French", "Spanish"],
        American: ["Burgers", "Pizza", "BBQ"],
      },
    },
  ];

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedOptions([]);
    setSubmitted(false);
  };

  const handleOptionChange = (event) => {
    const option = event.target.value;
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Food Survey App</h2>
      {!submitted && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="cuisineType">Select Your Preferred Cuisine: </label>
          <select
            id="cuisineType"
            onChange={handleTypeChange}
            value={selectedType || ""}
          >
            <option value="">--Select Cuisine--</option>
            {Object.keys(questions[0].options).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {selectedType && (
            <>
              <p style={{ marginBottom: "1px" }}>
                Select Your Preferred Options:
              </p>
              <div>
                {questions[0].options[selectedType].map((option) => (
                  <div key={option} style={{ marginBottom: "1px" }}>
                    <label>
                      <input
                        type="checkbox"
                        name={option}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={handleOptionChange}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <button type="submit" style={{ marginTop: "20px" }}>
                Submit
              </button>
            </>
          )}
        </form>
      )}

      {submitted && (
        <div style={{ marginTop: "20px" }}>
          <h3>Thank You for Sharing Your Preferences!</h3>
          <p>Cuisine: {selectedType}</p>
          <p>Preferred Options: {selectedOptions.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

// Feedback App Component
function FeedbackApp() {
  const [feedbackType, setFeedbackType] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackTypeChange = (event) => {
    const newFeedbackType = event.target.value;
    if (submitted) {
      setSubmitted(false);
      setFeedbackType(newFeedbackType);
      setComment("");
    } else {
      setFeedbackType(newFeedbackType);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleFeedbackSubmit}>
        <label htmlFor="feedbackType">Feedback Type:</label>
        <select
          id="feedbackType"
          onChange={handleFeedbackTypeChange}
          value={feedbackType}
        >
          <option value="">--Select Feedback Type--</option>
          <option value="Compliment">Compliment</option>
          <option value="Complaint">Complaint</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <br />

        {feedbackType && (
          <>
            <label htmlFor="comment">Comments:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              rows={4}
              cols={35}
            />
            <br />
            <br />
            <button type="submit">Submit</button>
          </>
        )}

        {submitted && (
          <div style={{ marginTop: "20px" }}>
            <p>{feedbackType}</p>
            <p>{comment}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <FoodSurveyApp />
      <FeedbackApp />
    </main>
  );
}
