import React, { useState } from 'react';

const TyreSizeDropdown = ({ onSelectSize }) => {
  const [tyreSizes, setTyreSizes] = useState([
    "165/80 R14",
    "175/65 R15",
    "185/70 R14",
    "195/55 R16",
    "205/65 R16",
    "215/75 R15",
    "235/70 R16",
    "245/70 R16",
    "265/65 R17",
    "275/55 R20",
  ]);
  const [newSize, setNewSize] = useState("");

  const handleAddSize = () => {
    if (newSize && !tyreSizes.includes(newSize)) {
      setTyreSizes([...tyreSizes, newSize]);
      setNewSize("");
      onSelectSize(newSize);
    }
  };

  return (
    <div>
      <label htmlFor="tyre-size">Select Tyre Size:</label>
      <select
        id="tyre-size"
        onChange={(e) => onSelectSize(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          -- Select a size --
        </option>
        {tyreSizes.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="new-size">Add New Size:</label>
        <input
          id="new-size"
          type="text"
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
          placeholder="e.g., 195/65 R15"
        />
        <button onClick={handleAddSize}>Add Size</button>
      </div>
    </div>
  );
};

export default TyreSizeDropdown;