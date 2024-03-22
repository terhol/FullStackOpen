const SearchCountry = ({ searchedCountry, setSearchedCountry }) => {
  return (
    <div>
      <form>
        <label htmlFor="country">Find countries</label>
        <input
          id="country"
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
