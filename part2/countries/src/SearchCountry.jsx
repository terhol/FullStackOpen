const SearchCountry = ({ searchedCountry, setSearchedCountry }) => {
  return (
    <div>
      <form>
        Find countries
        <input
          value={searchedCountry}
          onChange={(event) => {
            setSearchedCountry(event.target.value)
          }}
        />
      </form>
    </div>
  )
}

export { SearchCountry }
