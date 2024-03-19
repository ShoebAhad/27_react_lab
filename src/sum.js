import React, { useState } from 'react';

function App() {
  const [textBoxes, setTextBoxes] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddTextBox = () => {
    const newTextBoxes = [...textBoxes, { id: Date.now(), value: '' }];
    setTextBoxes(newTextBoxes);
  };

  const handleDeleteTextBox = (id) => {
    const updatedTextBoxes = textBoxes.filter((textBox) => textBox.id !== id);
    setTextBoxes(updatedTextBoxes);
  };

  const handleTextBoxChange = (id, value) => {
    const updatedTextBoxes = textBoxes.map((textBox) =>
      textBox.id === id ? { ...textBox, value } : textBox
    );
    setTextBoxes(updatedTextBoxes);
    calculateTotal(updatedTextBoxes);
  };

  const calculateTotal = (textBoxes) => {
    let sum = 0;
    textBoxes.forEach((textBox) => {
      if (!isNaN(parseFloat(textBox.value))) {
        sum += parseFloat(textBox.value);
      }
    });
    setTotal(sum);
  };

  return (
    <div>
      <button onClick={handleAddTextBox}>Add TextBox</button>
      {textBoxes.map((textBox) => (
        <div key={textBox.id}>
          <input
            type="text"
            value={textBox.value}
            onChange={(e) => handleTextBoxChange(textBox.id, e.target.value)}
          />
          <button onClick={() => handleDeleteTextBox(textBox.id)}>Delete</button>
        </div>
      ))}
      <div>Total: {total}</div>
    </div>
  );
}

export default App;
