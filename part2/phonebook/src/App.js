import { useEffect, useState } from 'react'
import personService from './services/personService';
import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import SearchBar from './components/SearchBar';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

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
        alert(`Updated ${duplicate.name}s number`)
        })
      } 
    } else {
      personService.create(newPerson).then(res => setPersons(persons.concat(res)));
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    const delMsg = window.confirm(`Do you want to delete ${person.name}`)
    if(delMsg){
      personService.remove(id).then(removedPerson => setPersons(persons.filter(p => p.id !== id)))
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
      <SearchBar handleSearch={handleSearch}></SearchBar>
      <PersonsForm 
      addPerson={addPerson} 
      handleNames={handleNames} 
      handleNumbers={handleNumbers}></PersonsForm>
      <h2>Contacts</h2>
      {searchFilter.map((p) => <Persons person={p} handleDelete={handleDelete} key={p.name}></Persons> )}  
    </div>
  )
}

export default App