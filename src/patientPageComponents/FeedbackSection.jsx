
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackSection = ({ user }) => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      toast.error("Feedback cannot be empty!");
      return;
    }

    
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    feedbacks.push({
      user: user.email,
      message: feedback,
      date: new Date().toISOString(),
    });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    setSubmitted(true);
    toast.success(" Feedback submitted successfully!");
    setFeedback("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-blue-700 mb-4">📝 Leave Feedback</h2>

      <textarea
        className="w-full border px-3 py-2 rounded text-sm focus:outline-none focus:ring focus:border-blue-300"
        rows={5}
        placeholder="How was your experience? Any suggestions or issues..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={submitted || feedback.trim() === ""}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {submitted ? "Thank You!" : "Submit Feedback"}
      </button>
    </div>
  );
};

export default FeedbackSection;
