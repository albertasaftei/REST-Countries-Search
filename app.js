const countriesListDiv = document.querySelector(".grid-container")
const searchBar = document.getElementById("searchBar")
const filter = document.getElementById("filter")
let countriesList = [];
let filterSelected = "";

fetch("https://restcountries.eu/rest/v2/all").then((response) => {
    return response.json();
}).then((countries) => {
    displayCountries(countries)
    countriesList = countries;
}).catch((error) => {
    console.error("Errore API: ", error)
})

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value
    const filteredCountries = countriesList.filter((country) => {
        return (country.name.toLowerCase().includes(searchString) && country.region.includes(filterSelected))
    })

    displayCountries(filteredCountries)
})

filter.addEventListener('click', (e) => {
    filterSelected = e.target.value
    const filteredCountries = countriesList.filter((country) => {
        return (country.region.includes(e.target.value))
    })

    displayCountries(filteredCountries)
})

const displayCountries = (countries) => {
    const htmlString = countries
        .map((country) => {
            return `
            <div class="box">
                <img src="${country.flag}">
                <div class="info">
                    <h3>${country.name}</h3>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString('en', {
                        maximumFractionDigits: 0
                    })}</p>
                </div>
            </div>`;
        })
        .join('');
    countriesListDiv.innerHTML = htmlString;
}