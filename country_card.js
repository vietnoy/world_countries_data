export function createCountryCard (country) {
    const card = document.createElement('div');
    card.className = 'card';
    const flag = document.createElement('img');
    flag.src = country.flag;
    card.appendChild(flag);
    const name = document.createElement('p');
    name.className = 'countryName';
    name.innerHTML = country.name;
    card.appendChild(name);
    const capital = document.createElement('p');
    capital.className = 'countryCapital';
    capital.innerHTML = 'Capital: ' + country.capital;
    card.appendChild(capital);
    const languages = document.createElement('p');
    languages.className = 'countryLanguages';
    languages.innerHTML = `Languages: ${country.languages.join(', ')}`;
    card.appendChild(languages);
    const population = document.createElement('p');
    population.className = 'countryPopulation';
    population.innerHTML = `Population: ${country.population}`;
    card.appendChild(population);
    return card;
}