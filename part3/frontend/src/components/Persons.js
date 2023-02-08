
const Persons = ({ person, handleDelete }) => {
    const personStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
        
    }
    return (
       <div style={personStyle}>
       <p key={person.name}>{person.name} - {person.number}</p> 
       <button name={person.name} id={person.id} onClick={() => handleDelete(person.id)}>Delete</button>
       </div> 
    )
}

export default Persons