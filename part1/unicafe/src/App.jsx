import { useState } from 'react';

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.all} />
        <StatisticLine text='average' value={props.average} />
        <StatisticLine text='positive' value={`${props.positive}%`} />
      </tbody>
    </table>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    const updatedAll = updatedGood + neutral + bad;
    setGood(updatedGood);
    setAll(updatedAll);
    setAverage((updatedGood - bad) / updatedAll);
    setPositive((updatedGood / updatedAll) * 100);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    const updatedAll = good + updatedNeutral + bad;
    setNeutral(updatedNeutral);
    setAll(updatedAll);
    setAverage((good - bad) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    const updatedAll = good + neutral + updatedBad;
    setBad(updatedBad);
    setAll(updatedAll);
    setAverage((good - updatedBad) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
