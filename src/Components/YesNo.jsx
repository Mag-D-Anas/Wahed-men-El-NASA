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
    <div className="question">
      <h2>{title}</h2>
     <div className="options">
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
     </div>
    </div>
  );
}

export default YesNo;
