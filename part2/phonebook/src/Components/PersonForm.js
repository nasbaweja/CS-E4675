import React from 'react';
import personService from '../Services/PersonsCommunication';

const PersonForm = (props) => {
    
    let newName = props.newName;
    let setNewName = props.setNewName;
    let newNumber = props.newNumber;
    let setNewNumber = props.setNewNumber;
    let persons = props.persons;
    let setPersons = props.setPersons;
    let setErrorMessage = props.setErrorMessage;
    const addPerson = (event) => {
        event.preventDefault();
    
        let found = persons.find(object => object.name === newName);

        let newUser = {
          name: newName,
          number: newNumber
        }

        if(!found){
            personService.create(newUser)
            setPersons([...persons, newUser]);
            setErrorMessage({
              text: `Added ${newUser.name}'s number`,
              type: "success",
            });
            setTimeout(() => setErrorMessage(null), 5000);
        }
        else{
          if(window.confirm(newName + ' is already added to phonebook, replace the number?'))
            {
              personService.update(found.id, newUser)
              .then((returnedValue) => {
              setPersons(
                persons
                  .filter((user) => user.name !== newUser.name)
                  .concat(returnedValue)
              )
              setErrorMessage({
                text: `Updated ${returnedValue.name}'s number`,
                type: "success",
              });
              setTimeout(() => setErrorMessage(null), 5000);
                }
              )
             .catch((e)=>{
                if(e.response.status===404){
                  setPersons(
                    persons
                    .filter((user) => user.name !== newUser.name)
                  )
                  setErrorMessage({
                    text: `${newUser.name} has already been deleted from the server`,
                    type: "error",
                  });
                setTimeout(() => setErrorMessage(null), 5000);
                }
              })
            }
        }
      }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input onChange={(inp)=> { setNewName(inp.target.value);}}/>
            </div>
            <div>
                number: <input onChange={(inp)=>{ setNewNumber(inp.target.value);}}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm