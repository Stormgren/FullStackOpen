const SearchBar = ({ handleSearch }) => {
  const formStyle = {
    margin: '10px',
  }
    return (
        <form style={formStyle}>
        <div>Search: 
        <input 
          
          onChange={handleSearch}
        />
        </div>
      </form> 
    )
}

export default SearchBar