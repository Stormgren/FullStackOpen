
const PersonsForm = ({ addPerson, handleNames, handleNumbers }) => {

  const inputStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
    }

    const btnStyle = {
      margin: '10px'
    }
    return (
        <form onSubmit={addPerson}>
        <div style={inputStyle}>
          name: <input
          onChange={handleNames}
        />
         <div style={inputStyle}>
          number: <input 
          onChange={handleNumbers}
          /></div>
        </div>
        <div>
          <button style={btnStyle} type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonsForm