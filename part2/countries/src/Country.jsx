import { Weather } from './Weather'

const Country = ({ selectedCountry }) => (
  <div>
    <div>
      <h1>{selectedCountry.name.common}</h1>
    </div>
    <div>Capital: {selectedCountry.capital[0]}</div>
    <div>
      Area: {selectedCountry.area} km<sup>2</sup>
    </div>
    <div>
      <h4>Languages:</h4>
    </div>
    <div>
      <ul>
        {Object.values(selectedCountry.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    </div>
    <div>
      <img
        src={selectedCountry.flags.png}
        alt={selectedCountry.flags.alt}
        className="countryFlag"
      />
    </div>
    <div>
      <Weather city={selectedCountry.capital[0]} />
    </div>
  </div>
)

export { Country }
