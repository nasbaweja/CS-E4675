import { useState } from 'react'

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6:0});

  const voteAddition = (selected) =>{
    let votesCopy = {...votes};
    votesCopy[selected] +=1;
    setVotes(votesCopy);
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <div>
        <p>has {votes[selected]} votes</p>
      </div>
      <div>
      <Button buttonText={"vote"} fn={()=> voteAddition(selected)} />
      <Button buttonText={"next anecdote"} fn={()=> setSelected(Randomizer(anecdotes))} />
      </div>
      <h1>Anecdote with the most votes</h1>
      
      {anecdotes[maxValue(votes)]}
    </div>
  )
}

const maxValue = (votes) => {
  return parseInt(Object.entries(votes).sort((x,y)=>y[1]-x[1])[0])
};

const Button = ({buttonText, fn}) =>{
  return(
    <button onClick={fn}>{buttonText}</button>
  )
}

const Randomizer = () => Math.floor(Math.random()*10)%anecdotes.length; 

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

export default App