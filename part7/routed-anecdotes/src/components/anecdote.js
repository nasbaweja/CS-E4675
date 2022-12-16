import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(ad => ad.id.toString() === id);
//   console.log(anecdote)
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for mote info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

export default Anecdote