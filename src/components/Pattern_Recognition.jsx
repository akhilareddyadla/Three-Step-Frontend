import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PatternRecognition = () => {
  const navigate = useNavigate();
  // Get the user ID from location state

  const [patternType, setPatternType] = useState("text");
  const [pattern, setPattern] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState(
    new Array(9).fill(false)
  ); // For number pattern
  const [graphicalPattern, setGraphicalPattern] = useState([]); // For graphical pattern

  const handlePatternSubmit = async (e) => {
    e.preventDefault();

    let submittedPattern = "";

    // Construct the submitted pattern based on the selected pattern type
    if (patternType === "numbers") {
      // Map the selected numbers to a list and join them as a string
      const selectedPattern = selectedNumbers
        .map((selected, index) => (selected ? index + 1 : null))
        .filter(Boolean);
      submittedPattern = selectedPattern; // Send as an array of integers
    } else if (patternType === "graphical") {
      submittedPattern = graphicalPattern; // Send as an array of selected dots
    } else {
      submittedPattern = pattern; // For text password, send it as a string
    }

    try {
      console.log("Pattern:", submittedPattern);
      let userId = localStorage.getItem("userId");
      console.log("userid", userId);
      const response = await fetch(
        "http://127.0.0.1:8000/Pattern_Recognition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, pattern: submittedPattern }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle the response and navigate on success
      const data = await response.json();
      console.log("Pattern submitted successfully:", data);

      // Navigate to next level after successful submission
      navigate("/third_level");

      // Reset form after submission
      resetForm();
    } catch (error) {
      console.error("Error submitting pattern:", error);
    }
  };

  const resetForm = () => {
    setPatternType("text");
    setPattern("");
    setSelectedNumbers(new Array(9).fill(false));
    setGraphicalPattern([]);
  };

  const toggleNumberSelection = (index) => {
    const updatedSelection = [...selectedNumbers];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedNumbers(updatedSelection);
  };

  const toggleGraphicalSelection = (dot) => {
    if (graphicalPattern.includes(dot)) {
      setGraphicalPattern(graphicalPattern.filter((d) => d !== dot));
    } else {
      setGraphicalPattern([...graphicalPattern, dot]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Pattern Recognition</h2>

      {/* Pattern Type Selection */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setPatternType("text")}
          className={`px-4 py-2 rounded ${
            patternType === "text"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600`}
        >
          Text Password
        </button>
        <button
          onClick={() => setPatternType("numbers")}
          className={`px-4 py-2 rounded ${
            patternType === "numbers"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600`}
        >
          Number Pattern
        </button>
        <button
          onClick={() => setPatternType("graphical")}
          className={`px-4 py-2 rounded ${
            patternType === "graphical"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600`}
        >
          Graphical Pattern
        </button>
      </div>

      {/* Form for the selected pattern type */}
      <form
        onSubmit={handlePatternSubmit}
        className="space-y-6 w-full max-w-sm"
      >
        <label
          htmlFor="pattern"
          className="block text-sm font-medium text-gray-700"
        >
          {patternType === "text" && "Enter your text password"}
          {patternType === "numbers" && "Select your number pattern"}
          {patternType === "graphical" && "Select your graphical pattern"}
        </label>

        {/* Number Pattern Grid */}
        {patternType === "numbers" && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {Array.from({ length: 9 }, (_, index) => (
              <button
                key={index}
                onClick={() => toggleNumberSelection(index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedNumbers[index]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-600`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* Graphical Pattern Dots */}
        {patternType === "graphical" && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {Array.from({ length: 9 }, (_, index) => (
              <button
                key={index}
                onClick={() => toggleGraphicalSelection(index + 1)}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  graphicalPattern.includes(index + 1)
                    ? "bg-green-500"
                    : "bg-gray-300"
                } hover:bg-green-600`}
              >
                <span className="block w-4 h-4 rounded-full bg-white"></span>
              </button>
            ))}
          </div>
        )}

        {/* Input for Text Password */}
        {patternType === "text" && (
          <input
            type="password"
            id="pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Your password"
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Pattern
        </button>
      </form>
    </div>
  );
};

export default PatternRecognition;
