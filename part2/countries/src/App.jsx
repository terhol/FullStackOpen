import { useState, useEffect } from 'react'
import { getAll } from './service/CountryService.js'
import { CountryList } from './CountryList.jsx'
import { SearchCountry } from './SearchCountry.jsx'

import '../styles/global.css'

function App() {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState('')

  useEffect(() => {
    getAll().then((countriesData) => setCountries(countriesData))
  }, [])

  const selectedCountries = countries.filter((country) => {
    const countryName = country.name.common.trim().toLowerCase()
    return countryName.includes(searchedCountry.trim().toLowerCase())
  })

  return (
    <div>
      <SearchCountry searchedCountry={searchedCountry} setSearchedCountry={setSearchedCountry} />
      <CountryList countries={selectedCountries} setSearchedCountry={setSearchedCountry} />
    </div>
  )
}

export default App
