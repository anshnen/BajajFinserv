import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const validateJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateJson(jsonInput)) {
      // Placeholder for API call
      setTimeout(() => {
        const fakeResponse = {
          "is_success": true,
          "user_id": "john_doe_17091999",
          "email": "john@xyz.com",
          "roll_number": "ABCD123",
          "numbers": ["2", "4", "5", "92"],
          "alphabets": ["A", "C", "Z", "a"],
          "highest_lowercase_alphabet": ["a"]
        };
        setApiResponse(fakeResponse);
      }, 1000);
    } else {
      alert('Invalid JSON format');
    }
  };

  const handleOptionChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!apiResponse) return null;
    return (
      <div>
        {selectedOptions.includes('Alphabets') && (
          <div>Alphabets: {apiResponse.alphabets.join(', ')}</div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>Numbers: {apiResponse.numbers.join(', ')}</div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>Highest lowercase alphabet: {apiResponse.highest_lowercase_alphabet.join(', ')}</div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder='Enter JSON'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {apiResponse && (
        <>
          <h2>Select Data to Display:</h2>
          <select multiple={true} onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
