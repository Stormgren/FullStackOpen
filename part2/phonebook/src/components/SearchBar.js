const SearchBar = ({ handleSearch }) => {
    return (
        <form>
        <div>Search: 
        <input 
          
          onChange={handleSearch}
        />
        </div>
      </form> 
    )
}

export default SearchBar