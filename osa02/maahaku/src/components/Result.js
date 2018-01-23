import React from 'react';

const Country = ({ country }) => (
    <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <img src={country.flag} width="100px" alt="" />
    </div>
)

const CountryList = ({ countries, onClick }) => (
    <ul>
        {countries.map(c => <li onClick={onClick(c)} key={c.name}>{c.name}</li>)}
    </ul>
)

const Result = ({ countries, search, onClick }) => {
    if (search.length === 0)
        return null

    const filtered = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

    if (filtered.length === 0)
        return <p>No country matches search</p>

    if (filtered.length === 1)
        return <Country country={filtered[0]} />

    if (filtered.length <= 10)
        return <CountryList countries={filtered} onClick={onClick} />
    return <p>Too many countries matches search</p>
}

export default Result
