import {useState} from 'react'
import Button from './button/Button'
import Statistic from './statistics/Statistic'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => {
    setGood(good + 1)
  }

  const neutralHandler = () => {   
    setNeutral(neutral + 1)
  }

  const badHandler = () => {
    setBad(bad + 1)
  }

  return (
  <div>
    <h1>give feedback</h1>
    <Button handler={goodHandler} text="good"></Button>    
    <Button handler={neutralHandler} text="neutral"></Button>
    <Button handler={badHandler} text="bad"></Button>
   <Statistic good={good} neutral={neutral} bad={bad}></Statistic>

  </div>
  );
}

export default App;
