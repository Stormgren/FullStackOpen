
const PersonsForm = ({ addPerson, handleNames, handleNumbers }) => {
  
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input
        //   value={newName}
          onChange={handleNames}
        />
         <div>number: <input 
        //  value={newNumber}
          onChange={handleNumbers}
          /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonsForm