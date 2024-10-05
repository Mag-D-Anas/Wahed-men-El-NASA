import React from "react";
import { useState } from "react";
import Question from "../Components/Question";
import YesNo from "../Components/YesNo";
import "./FingerPrintPanel.css";

const questions = [
  { id: 1, title: "1. Electric Bill", min: 0, max: 200 },
  { id: 2, title: "2. Gas Bill", min: 0, max: 100 },
  { id: 3, title: "3. Oil Bill", min: 0, max: 100 },
  { id: 4, title: "4. Total yearly mileage on your car", min: 0, max: 5000 },
  {
    id: 5,
    title: "5. The number of hours of flights you've taken in the last year",
    min: 0,
    max: 50,
  },
  { id: 6, title: "6. Do you recycle newspaper" },
  { id: 7, title: "7. Do you recycle aluminum and tin" },
];

function FingerPrintPanel() {
  const [currentId, setCurrentId] = useState(1);
  const showNext = currentId < 7 ? true : false;
  const [showPrev,setshowPrev] = useState(currentId > 1 ? true : false);
  const showSubmit = currentId === 7 ? true : false;
  const [answers, setAnswers] = useState([0, 0, 0, 0, 0, "No", "No"]);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [result, setResult] = useState("");

  function handleAnswer(id, ans) {
    const temp = answers;
    temp[id - 1] = ans;
    setAnswers(temp);
  }

  function showQuestion() {
    const item = questions.filter((question) => question.id === currentId)[0];
    console.log(item.id);
    if (item.id < 6) {
      return (
        <Question
          key={item.id}
          id={item.id}
          title={item.title}
          min={item.min}
          max={item.max}
          handleAnswer={handleAnswer}
        />
      );
    }
    return (
      <YesNo
        key={item.id}
        id={item.id}
        title={item.title}
        handleAnswer={handleAnswer}
      />
    );
  }

  function handleNext() {
    setshowPrev(true);
    setCurrentId(currentId + 1);
  }

  function handlePrevious() {
    if (currentId === 2) {
      setshowPrev(false);
    }
    setCurrentId(currentId - 1);
  }

  function showNextButton() {
    if (showNext) {
      return <button onClick={() => handleNext()}>Next</button>;
    }
  }

  function showPrevButton() {
    if (showPrev) {
      return <button onClick={() => handlePrevious()}>Previous</button>;
    }
  }

  function showSubmitButton() {
    if (showSubmit) {
      return (
        <button type="submit" onClick={(e) => onSubmitHandler(e)}>
          Submit
        </button>
      );
    }
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    setshowPrev(false);
    setDisplayAnswer(true);
    let result = answers[0] * 105;
    result += answers[1] * 105;
    result += answers[2] * 113;
    result += answers[3] * 79;
    if (answers[4] <= 4) {
      result += answers[4] * 1100;
    } else {
      result += answers[4] * 4400;
    }
    if (result[5] === "Yes") {
      result += 184;
    }
    if (result[6] === "Yes") {
      result += 166;
    }
    console.log(result);

    if (result <= 15999) {
      result = "low";
    } else if (result <= 22000) {
      result = "average";
    } else {
      result = "high";
    }
    setResult(result);
  }

  function showReset() {
    if (displayAnswer) {
      return <button onClick={handleReset}>Reset</button>;
    }
  }

  function handleReset() {
    setCurrentId(1);
    setAnswers([0, 0, 0, 0, 0, "No", "No"]);
    setDisplayAnswer(false);
  }

  return (
    <div className="contianer text-white">
      <div className="header">
        <h2 className="text-3xl">Let's Calculate Your CO2 Finger Print!</h2>
        {showQuestion()}
      </div>
      <div className="btns">
        {showPrevButton()}
        {showNextButton()}
      </div>
      <div className="btns">{showSubmitButton()}</div>
      {displayAnswer && <h1>Your Result is: <span style={{color: result === "low" ? 'green' : result==='average'?'yellow':'red'}}>{result}</span></h1>}
      <div className="btns">{showReset()}</div>
    </div>
  );
}

export default FingerPrintPanel;
