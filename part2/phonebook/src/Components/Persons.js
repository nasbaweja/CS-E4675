import React from 'react';
import personService from '../Services/PersonsCommunication';

const FilteredData = (props) =>{
    let persons = props.persons;
    let searchName = props.searchName;
    let setPersons = props.setPersons;
    let setErrorMessage = props.setErrorMessage;

    const deletePerson = (id, name) => {
      if (window.confirm(`Are you sure you want to delete ${name}?`)) {
        personService.remove(id);
        setPersons(persons.filter((person) => person.id !== id));
        setErrorMessage({
          text: `Successfully Deleted ${name}'s number`,
          type: "success",
        });
        setTimeout(() => setErrorMessage(null), 5000);
      }
    };

    const filterData = persons.filter((person) => {
      if (searchName === '') {
          return person;
      }
      else {
          return (person.name.toLowerCase().includes(searchName.toLowerCase()))
      }
    })
    return (
      <div>
          {filterData.map((person) => (
              <div key={person.name}>
              {person.name} {person.number} 
                <button onClick={()=> deletePerson(person.id, person.name)}>Delete</button> 
            </div>
          ))}
      </div>
    )
  }

  export default FilteredData;