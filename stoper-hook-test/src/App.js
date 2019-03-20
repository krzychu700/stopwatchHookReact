import React, { useState, useEffect } from "react";
import "./App.css";

function Stopwatch() {
  const [running, setRunning] = useState("false");
  const [watch, setWatch] = useState();
  const [times, setTimes] = useState({
    minutes: 0,
    seconds: 0,
    miliseconds: 0
  });
  const [score, setScore] = useState([]);

  function reset() {
    setTimes({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
    setScore([]);
  }

  function start() {
    if (running === "false") {
      setRunning("true");
      setWatch(setInterval(() => calculate(), 10));
    } else {
      setScore([
        ...score,
        {
          miliseconds: times.miliseconds,
          seconds: times.seconds,
          minutes: times.minutes
        }
      ]);
    }
  }

  function stop() {
    setRunning("false");
    clearInterval(watch);
  }

  function calculate() {
    setTimes({ ...times, miliseconds: (times.miliseconds += 1) });
    if (times.miliseconds >= 100) {
      setTimes({ ...times, miliseconds: (times.miliseconds = 0) });
      setTimes({ ...times, seconds: (times.seconds += 1) });
    }
    if (times.seconds >= 60) {
      setTimes({ ...times, seconds: (times.seconds = 0) });
      setTimes({ ...times, minutes: (times.minutes += 1) });
    }
    setTimes({
      ...times,
      miliseconds: times.miliseconds,
      seconds: times.seconds,
      minutes: times.minutes
    });
  }

  function format() {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  function pad0(value) {
    let result = value.toString();

    return result.length < 2 ? "0" + result : result;
  }

  return (
    <div>
      <div className="stoper">
        <div className="buttons">
          <button className="button" onClick={reset}>
            Reset
          </button>

          <button className="button" onClick={start}>
            {running === "false" ? "Start" : "Add score"}
          </button>
          <button className="button" onClick={stop}>
            Stop
          </button>
        </div>
        <div className="stopwatch">
          <p> {format(times.minutes)} </p>
        </div>
      </div>
      <div className="results">
        {score.map((score, index) => (
          <p className="result" key={index}>{`${
            score.minutes < 9 ? `0${score.minutes}` : score.minutes
          }:${score.seconds < 9 ? `0${score.seconds}` : score.seconds}:${
            score.miliseconds < 9 ? `0${score.miliseconds}` : score.miliseconds
          }`}</p>
        ))}
      </div>
    </div>
  );
}

export default Stopwatch;
