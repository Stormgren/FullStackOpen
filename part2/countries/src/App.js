import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState([])
  
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleSearch = (e) => {
    const countrySearch = countries.filter(c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    const countryInfo = countrySearch.filter(c => c.name.common === e.target.value)

    if (countryInfo.length === 1) {
      setSearch(country[0].name.common)
      setCountry(countryInfo)
    }
    
    setSearch(e.target.value)
    setCountry(countrySearch)
  }

  
  return (
    <>
    <input value={search} onChange={handleSearch}/>
      {country.length > 10
      ? <h1>Too many matches, please specify</h1>
      : country.length !== 1
        ? <>{country.map(c => {
                return (
                  <h3 key={c.name.common}>
                    {c.name.common}<button value={c.name.common} onClick={handleSearch}>Show</button>
                  </h3>
                )
              })}
            </>
        : <Country details={country[0]}/>}
    </>
  )
}

export default App