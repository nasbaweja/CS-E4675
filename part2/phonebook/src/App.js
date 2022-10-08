import React, { useState, useEffect } from 'react';
import Filter from './Components/Filter';
import Persons from './Components/Persons';
import PersonForm from './Components/PersonForm';
import personService from './Services/PersonsCommunication';
import Notification from './Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName,setSearchName]=useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    personService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }
  
  useEffect(hook, [])

  return (
    
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter setField = {setSearchName}/>
      <h2>Add A New</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App