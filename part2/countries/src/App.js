import axios from 'axios';
import { useEffect, useState } from 'react';
import Country from './components/Country';
import './App.css';

function App() {
const [countries, setCountries] = useState([]);
const [countryFilter, setCountryFilter] = useState([])
const [country, setCountry] = useState(null)
let data;

useEffect(() => {
  console.log('use effect')
   axios.get(`https://restcountries.com/v3.1/all`, {headers: {
     "Access-Control-Allow-Origin": "*"
   }}).then(res => {
   setCountries(res.data)
   })
}, [])


const countryHandler = (e) => {
  const searchFilter = countries.filter(c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  console.log(searchFilter)
  

  if(searchFilter.length === 1){
    setCountry(searchFilter[0])
  }
    setCountryFilter(searchFilter)
  
}

const searchHandler = (e) => {
  e.preventDefault()
}

if(countryFilter.length > 10){
  data = <h1>Too many matches, specify another filter</h1>
} else if (countryFilter.length > 1){ 
  data = countryFilter.map(c => <h1>{c.name.common}</h1>)
} else if(countryFilter.length === 1) {
  data = <Country details={countryFilter[0]}/> 
  } else {
  data = null;
}


  return (
    <div className="App">
    <h1>Countries</h1>
    <form onSubmit={searchHandler}>
    <input type="text" onChange={countryHandler}/>
    </form>
      {data}
    </div>
  );
}

export default App;
