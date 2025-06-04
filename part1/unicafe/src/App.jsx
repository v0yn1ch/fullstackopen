import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const increaseGood = () => {
    const updatedG = good + 1;
    const newFeedback = feedback + 1;
    const newTotal = updatedG + neutral + bad;
    const newPositive = (updatedG / newTotal) * 100;
    setGood(updatedG);
    setTotal(newTotal);
    setFeedback(newFeedback);
    setAverage(newFeedback / newTotal);
    setPositive(newPositive);
  };
  const increaseNeutral = () => {
    const updatedN = neutral + 1;
    const newTotal = good + updatedN + bad;
    const newPositive = (good / newTotal) * 100;
    setNeutral(updatedN);
    setTotal(newTotal);
    setAverage(feedback / newTotal);
    setPositive(newPositive);
  };
  const increaseBad = () => {
    const updatedB = bad + 1;
    const newFeedback = feedback - 1;
    const newTotal = good + neutral + updatedB;
    const newPositive = (good / newTotal) * 100;
    setBad(updatedB);
    setTotal(newTotal);
    setFeedback(newFeedback);
    setAverage(newFeedback / newTotal);
    setPositive(newPositive);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={increaseGood} text="good" />
        <Button onClick={increaseNeutral} text="neutral" />
        <Button onClick={increaseBad} text="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, counter }) => (
  <tr>
    <td>{text}</td>
    <td>{counter}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (!(good || neutral || bad)) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" counter={good} />
        <StatisticLine text="neutral" counter={neutral} />
        <StatisticLine text="bad" counter={bad} />
        <StatisticLine text="all" counter={total} />
        <StatisticLine text="average" counter={average} />
        <StatisticLine text="positive" counter={positive + " %"} />
      </tbody>
    </table>
  );
};

export default App;
