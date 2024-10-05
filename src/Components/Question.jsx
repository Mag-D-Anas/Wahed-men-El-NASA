import React, { useEffect } from "react";
import { useState } from "react";

function Question({ id, title, min, max, handleAnswer }) {
  const [val, setVal] = useState((min + max) / 2);

  const labels = {
    1: "$",
    2: "$",
    3: "$",
    4: "Km",
    5: "Flights",
  };

  useEffect(() => {
    handleAnswer(id, (min + max) / 2);
  }, []);
  function onSlideHandler(e) {
    setVal(e.target.value);
    handleAnswer(id, e.target.value);
  }

  return (
    <div className="question">
      <h2>{title}</h2>
      <input
        type="range"
        min={min}
        max={max}
        value={val}
        onChange={(e) => onSlideHandler(e)}
      />
      <h3>{val}  {labels[id]}</h3>
    </div>
  );
}

export default Question;
