import { Country } from './Country'

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>
  }
  if (countries.length === 1) {
    return <Country selectedCountry={countries[0]} />
  } else {
    return (
      <ul>
        {countries.map((country) => {
          return <li key={country.name.official}>{country.name.common}</li>
        })}
      </ul>
    )
  }
}

export { CountryList }
