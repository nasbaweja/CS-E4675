import { useState } from 'react'

const Heading = (props) => <div><h1>{props.heading}</h1></div>

const Button = ({fn, text}) => <button onClick={fn}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) =>{
  const statistics = "statistics"
  let average = 0;
  let positive = 0;
  if(props.good+props.bad+props.neutral !== 0){
    average = (props.good-props.bad)/(props.good+props.neutral+props.bad);
    positive = (props.good*100)/(props.good+props.neutral+props.bad)
  
    return(
      <div>
        <Heading heading={statistics}/>
        <table>
        <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.good+props.neutral+props.bad} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive} />
        </tbody>
        </table>
      </div>
    )
  }
  else{
    return (
      <p>No Feedback Given</p>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const heading = "give feedback"

  return (
    <div>
      <Heading heading={heading}/>
      <Button fn={()=> setGood(good+1)} text="good"/>
      <Button fn={()=> setNeutral(neutral+1)} text="neutral"/>
      <Button fn={()=> setBad(bad+1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App