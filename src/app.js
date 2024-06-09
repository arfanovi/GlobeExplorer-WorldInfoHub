document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const container = document.getElementById('country-container');
    
    let countries = [];

    // Fetch countries data
    fetch('/src/countries.json')
        .then(response => response.json())
        .then(data => {
            countries = data;
            displayCountries(countries);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Display countries based on the filtered array
    const displayCountries = (countriesToDisplay) => {
        container.innerHTML = '';
        countriesToDisplay.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.className = 'card';
            countryDiv.innerHTML = `
                <h2>${country.country} (${country.code})</h2>
                <p>Flag: ${country.flag}</p>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Religions:</p>
                <ul>
                    <li>Islam: ${country.religious.Islam}%</li>
                    <li>Other: ${country.religious.Other}%</li>
                </ul>
            `;
            container.appendChild(countryDiv);
        });
    };

    // Search countries based on user input
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredCountries = countries.filter(country =>
            country.country.toLowerCase().includes(query)
        );
        displayCountries(filteredCountries);
    });
});
