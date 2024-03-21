const Country = ({ selectedCountry }) => {
  const finalLanguageList = (languageList) => {
    const allLanguages = Object.values(languageList)
    return allLanguages.map((language) => <li key={language}>{language}</li>)
  }

  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <p>Capital: {selectedCountry.capital[0]}</p>
      <p>Area: {selectedCountry.area} km²</p>
      <h4>Languages:</h4>
      {finalLanguageList(selectedCountry.languages)}
      <p>
        <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} />
      </p>
      <ul></ul>
    </div>
  )
}
export { Country }
