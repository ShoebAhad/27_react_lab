import React, { useState } from "react";
import "./App.css"; // Importing CSS file for styling

function App() {
  const [textBoxes, setTextBoxes] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddTextBox = () => {
    const newTextBoxes = [...textBoxes, { id: Date.now(), value: "" }];
    setTextBoxes(newTextBoxes);
    calculateTotal(newTextBoxes);
  };

  const handleDeleteTextBox = (id) => {
    const updatedTextBoxes = textBoxes.filter((textBox) => textBox.id !== id);
    setTextBoxes(updatedTextBoxes);
    calculateTotal(updatedTextBoxes); // Recalculate total after deleting a textbox
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
    <div className="container">
      <button onClick={handleAddTextBox}>Add TextBox</button>
      <p>Total Text Boxes: {textBoxes.length}</p>
      {textBoxes.map((textBox) => (
        <div key={textBox.id} className="textbox-container">
          <input
            type="text"
            value={textBox.value}
            onChange={(e) => handleTextBoxChange(textBox.id, e.target.value)}
          />
          <button onClick={() => handleDeleteTextBox(textBox.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
