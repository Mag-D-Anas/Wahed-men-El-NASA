import React, { useEffect } from "react";
import { useState } from "react";

function YesNo({ id, title, handleAnswer }) {
  const [selectedOption, setSelectedOption] = useState("No");

  const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      handleAnswer(id, selectedOption);
  };

    useEffect(() => {
      handleAnswer(id, "No");
    }, []);

  return (
    <div>
      <h2>{title}</h2>
      <label>
        <input
          type="radio"
          value="Yes"
          checked={selectedOption === "Yes"}
          onChange={handleOptionChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          value="No"
          checked={selectedOption === "No"}
          onChange={handleOptionChange}
        />
        No
      </label>
      <h3>{selectedOption}</h3>
    </div>
  );
}

export default YesNo;
