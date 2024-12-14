import React, { useState } from 'react';

const PatternValidation = () => {
  const [selectedPattern, setSelectedPattern] = useState([]);
  const [message, setMessage] = useState('');
  const [patternType, setPatternType] = useState('numbers'); // Default to 'numbers'

  // Avoid duplicate cell entries in the pattern
  const handleCellClick = (cell) => {
    if (!selectedPattern.includes(cell)) {
      setSelectedPattern([...selectedPattern, cell]);
    }
  };

  // Submit pattern to backend
  const handleSubmitPattern = () => {
    const user_id = localStorage.getItem("user_id");

    const patternData = {
      pattern: selectedPattern,
      user_id: user_id,
    };

    console.log("Pattern data", patternData.pattern); // Moved after declaration

    fetch('http://127.0.0.1:8000/Pattern_Validation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patternData),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(`Server Error: ${err.message || 'Unknown error'}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setMessage('Pattern verified successfully!');
          console.log(data.message);
        } else {
          setMessage('Pattern mismatch');
        }
      })
      .catch(error => {
        console.error('Fetch operation error:', error);
        setMessage('There was an issue with pattern verification.');
      });
  };

  // Render Text Password Input
  const renderTextPasswordInput = () => (
    <input
      type="password"
      placeholder="Enter your text password"
      value={selectedPattern}
      onChange={(e) => setSelectedPattern(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
    />
  );

  // Render Number Pattern Grid
  const renderNumberPatternGrid = () => (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(cell => (
        <div 
          key={cell}
          onClick={() => handleCellClick(cell)}
          className={`w-16 h-16 border border-gray-300 flex items-center justify-center cursor-pointer ${selectedPattern.includes(cell) ? 'bg-blue-300' : 'bg-gray-100'}`}
        >
          {cell}
        </div>
      ))}
    </div>
  );

  // Render Graphical Pattern (Dots)
  const renderGraphicalPatternGrid = () => (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(cell => (
        <div 
          key={cell}
          onClick={() => handleCellClick(cell)}
          className={`w-16 h-16 border border-gray-300 flex items-center justify-center cursor-pointer ${selectedPattern.includes(cell) ? 'bg-green-500' : 'bg-gray-100'}`}
        >
          {/* For graphical, show an empty dot that fills with color when selected */}
          <span className={`w-6 h-6 rounded-full ${selectedPattern.includes(cell) ? 'bg-green-500' : 'bg-white'} border`}></span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Pattern Recognition</h2>

      {/* Pattern Type Selection */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setPatternType('text')}
          className={`px-4 py-2 rounded ${patternType === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
        >
          Text Password
        </button>
        <button
          onClick={() => setPatternType('numbers')}
          className={`px-4 py-2 rounded ${patternType === 'numbers' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
        >
          Number Pattern
        </button>
        <button
          onClick={() => setPatternType('graphical')}
          className={`px-4 py-2 rounded ${patternType === 'graphical' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600`}
        >
          Graphical Pattern
        </button>
      </div>

      {/* Render pattern based on selected pattern type */}
      {patternType === 'text' && renderTextPasswordInput()}
      {patternType === 'numbers' && renderNumberPatternGrid()}
      {patternType === 'graphical' && renderGraphicalPatternGrid()}

      <button 
        onClick={handleSubmitPattern}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Pattern
      </button>

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default PatternValidation;
