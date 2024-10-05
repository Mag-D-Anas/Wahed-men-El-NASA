import React from "react";
import { useState } from "react";
import Question from "../Components/Question";
import MCQ from "../Components/MCQ";
import "./FingerPrintPanel.css";

const questions = [
  { id: 1, title: "1. Electric Bill", min: 0, max: 200 },
  { id: 2, title: "2. Gas Bill", min: 0, max: 100 },
  { id: 3, title: "3. Oil Bill", min: 0, max: 100 },
  { id: 4, title: "4. Total yearly kilometers driven on your car", min: 0, max: 5000 },
  {
    id: 5,
    title: "5. The number of flights you've taken in the last year (4 hours or less)",
    min: 0,
    max: 20,
  },
  {
    id: 6,
    title: "6. The number of hours of flights you've taken in the last year (More than 4 hours)",
    min: 0,
    max: 20,
  },
  { id: 7, title: "7. Do you recycle newspaper" },
  { id: 8, title: "8. Do you recycle aluminum and tin" },
];

function FingerPrintPanel() {
  const [currentId, setCurrentId] = useState(1);
  const showNext = currentId < 8 ? true : false;
  const [showPrev,setshowPrev] = useState(currentId > 1 ? true : false);
  const showSubmit = currentId === 8 ? true : false;
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
    if (item.id < 7) {
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
      <MCQ
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

    result += Number(answers[1]) * 105;
    result += Number(answers[2]) * 113;
    result += Number(answers[3]) * 0.622 * 0.79; // km to miles
    result += Number(answers[4]) * 1100; 
    result += Number(answers[5]) * 4400;
    if (answers[6] === "No") {
      result += 184;
    }

    if (answers[7] === "No") {
      result += 166;
    }

    if (result <= 17000) {
      setResult("low");
    } else if (result <= 27000) {
      setResult("average");
    } else {
      setResult("high");
    }
    
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
        <h2 className="text-3xl">Let's Calculate Your CO₂ Fingerprint!</h2>
        {showQuestion()}
      </div>
      <div className="btns">
        {showPrevButton()}
        {showNextButton()}
        {!displayAnswer && showSubmitButton()}
      </div>
      {displayAnswer && <h1>Your Result is: <span style={{color: result === "low" ? 'green' : result==='average'?'yellow':'red'}}>{result}</span></h1>}
      <div className="btns">{showReset()}</div>
    </div>
  );
}

export default FingerPrintPanel;
