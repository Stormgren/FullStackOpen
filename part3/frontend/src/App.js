import { useEffect, useState } from 'react'
import personService from './services/personService';
import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import SearchBar from './components/SearchBar';
import Notification from './components/Notification';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(()=>{
   personService.getAll().then(personsData => {
      setPersons(personsData);
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const duplicate = persons.find(p =>  p.name.toLowerCase() === newPerson.name.toLowerCase());

    if(duplicate){
      const changeNumber = window.confirm(`Person ${newName} is already in the phonebook, do you want to change the number?`)

      if(changeNumber){
        const newNum = { ...duplicate, number: newNumber}
        personService.update(duplicate.id, newNum)
        .then(obj => {
        setPersons(persons.map(p => p.id !== duplicate.id ? p : obj))
        
        setNotification(`Number for ${obj.name} has been updated`);
        setTimeout(() => {
        setNotification(null);
        }, 5000);
      }).catch((error) => {
        setErrorMsg(
        `Information for ${duplicate.name} has already been removed from server`
        );
        setPersons(persons.filter((p) => p.id !== duplicate.id));
        setTimeout(() => {
        setErrorMsg(null);
        }, 5000);
      });
    }
      
    } else {
      personService.create(newPerson).then(res => {
        setPersons(persons.concat(res))
        setNotification(`${newPerson.name} has been added to contact list`)
        setTimeout(() => {
          setNotification(null);
        }, 5000);
    })
      .catch((error) => {
        setErrorMsg(error.response.data.error);
      setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
      });;
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    const delMsg = window.confirm(`Do you want to delete ${person.name}`)
    if(delMsg){
      personService.remove(id).then(removedPerson => {
        setPersons(persons.filter(p => p.id !== id))
        setErrorMsg(`Contact ${person.name} has been removed`)
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
      })
      .catch(err => alert(err))
    }
  }
 
  const handleNames = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  }

  const handleNumbers = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchName(e.target.value)
  }

  const searchFilter = persons.filter(p => {
    return JSON.stringify(p).toLowerCase().includes(searchName.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <br/>
      <Notification
        msg={ notification || errorMsg }
        className={`${notification ? "notification" : "error"}`}
      />
      <h3>Add contact:</h3>
      <PersonsForm 
      addPerson={addPerson} 
      handleNames={handleNames} 
      handleNumbers={handleNumbers}></PersonsForm>
      <SearchBar handleSearch={handleSearch} />
      <h2>Contacts</h2>
      {searchFilter.map((p) => <Persons person={p} handleDelete={handleDelete} key={p.name}></Persons> )}  
    </div>
  )
}

export default App
