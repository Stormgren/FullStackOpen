import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [voted, setVoted] = useState("")

   const displayAnecdote = () => {
    const index = Math.floor(Math.random() * anecdotes.length);

    setSelected(index);
    // console.log(anecdotes[selected], selected)
  }

  const voteHandler = () => { 
    const points = [...votes];
    points[selected] += 1;
    setVotes(points)
    const maxVotes = points.indexOf(Math.max(...points))
    setVoted(anecdotes[maxVotes])
  }

  return (
    <div>
      <h1>{anecdotes[selected]}</h1>
      <p>Has {votes[selected]} votes</p>
      <button onClick={voteHandler}>vote</button>
      <button onClick={displayAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <h3>{voted}</h3>
    </div>
  )
}

export default App