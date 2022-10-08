import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './Components/Countries';

const App = () => {

  const [countryData, setCountryData] = useState([])
  const [countrySearch, setCountrySearch] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountryData(response.data)
      })
  }
  
  const filterData = countryData.filter((country) => {
    if (countrySearch === '') {
        return [];
    }
    else {
        return (country.name.common.toLowerCase().includes(countrySearch))
    }
  })

  useEffect(hook, [])

  return(
    <div>
      <div>
      Find Countries<input onChange={(inp) => {setCountrySearch(inp.target.value.toLowerCase())}}></input>
      </div>
      <div>
        <Countries filterData={filterData}/>          
      </div>
    </div>
  )
}

export default App