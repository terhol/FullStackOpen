import { Country } from './Country'

const CountryList = ({ countries, setSearchedCountry }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>
  }

  if (countries.length === 1) {
    return <Country selectedCountry={countries[0]} />
  }

  return (
    <ul>
      {countries.map((country) => {
        return (
          <li key={country.name.official}>
            {country.name.common}{' '}
            <button onClick={() => setSearchedCountry(country.name.common)}>Show</button>
          </li>
        )
      })}
    </ul>
  )
}

export { CountryList }
