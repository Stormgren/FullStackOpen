import axios from "axios"
import { useState, useEffect } from "react"

const Country = ({ details }) => {
    // const [details, setDetails] = useState(name)
    // useEffect(() => {
    //   axios.get(`https://restcountries.com/v3.1/name/${name}`)
    //   .then(res => setDetails(res.data))
    // }, [name])
    
    return(
        <div>
            <h1>{details.name.common}</h1>
            <h3>{details.name.official}</h3>
            <p>Capital: {details.capital}</p>
            <p>Area: {details.area}</p>
            <p>Languages: </p>
            <ul>
            {Object.keys(details.languages).map((value, index) => {
            return (
            <li>{value}</li>
            )}
            )}
            </ul>
            <img src={details.flags.png} alt={details.flags.alt} />
        </div>
    )
}

export default Country