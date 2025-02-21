import React, { useState } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedSections, setSelectedSections] = useState(['characters', 'numbers', 'highestAlphabet']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('https://fullstack-production-355b.up.railway.app/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert('Invalid JSON input');
    }
  };

  return (
    <div className="container">
      <h1>BFHL - Harshit Mehta</h1>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className='form-container'>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON (e.g., {"data": ["A", "C", "z"]})'
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          {/* Dropdown for Multiselect */}
          <label htmlFor="sectionSelector">Select Sections to Display:</label>
          <select
            id="sectionSelector"
            multiple
            value={selectedSections}
            onChange={(e) => setSelectedSections(Array.from(e.target.selectedOptions, (option) => option.value))}
          >
            <option value="characters">Characters</option>
            <option value="numbers">Numbers</option>
            <option value="highestAlphabet">Highest Alphabet</option>
          </select>

          {/* Output Sections */}
          {selectedSections.includes('characters') && (
            <div>
              <h3>Characters</h3>
              <p>{response.alphabets?.join(', ')}</p>
            </div>
          )}

          {selectedSections.includes('numbers') && (
            <div>
              <h3>Numbers</h3>
              <p>{response.numbers?.join(', ')}</p>
            </div>
          )}

          {selectedSections.includes('highestAlphabet') && (
            <div>
              <h3>Highest Alphabet</h3>
              <p>{response.highest_alphabet?.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
