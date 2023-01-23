
const Persons = ({ person, handleDelete }) => {
  
    return (
       <>
       <p key={person.name}>{person.name} - {person.number}</p> 
       <button name={person.name} id={person.id} onClick={() => handleDelete(person.id)}>Delete</button>
       </> 
    )
}

export default Persons