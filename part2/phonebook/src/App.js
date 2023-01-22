import { useEffect, useState } from 'react'
import axios from 'axios'
import Persons from './components/Persons';
import PersonsForm from './components/PersonsForm';
import SearchBar from './components/SearchBar';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(()=>{
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
      console.log(res.data)
    })

  }, [])
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const duplicate = persons.find(p => JSON.stringify(p.name) === JSON.stringify(newPerson.name));
   
    if(!duplicate){
      setPersons(persons.concat(newPerson));
      
    } else {
      alert(`${newPerson.name} is already added to the phonebook`)
     
    }

    setNewName('')
      setNewNumber('')
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
      {searchFilter.map((p) => <Persons person={p}></Persons>)}  
    </div>
  )
}

export default App