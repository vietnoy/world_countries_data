import { originalCountries } from "./countries_data.js";
import { createCountryCard } from "./country_card.js";

const display = document.querySelector('.display');
const name = document.querySelector('.name');
const capital = document.querySelector('.capital');
const population = document.querySelector('.population');
const stats = document.querySelector('.stats');
const input = document.querySelector('#searchBox');
let count = document.querySelector('.satisfied');
let countries = originalCountries;

let nameBool = true;
let capitalBool = true;
let populationBool = true;

function removeArrow () {
    if(name.querySelector('i')) name.removeChild(name.querySelector('i'));
    if(capital.querySelector('i')) capital.removeChild(capital.querySelector('i'));
    if(population.querySelector('i')) population.removeChild(population.querySelector('i'));
}

//this function is called when there is nothing to interact with so it will display this default
function defaultDisplay (countries) {
    display.innerHTML = '';
    countries.forEach(country => {
        display.appendChild(createCountryCard(country));
    });
}

defaultDisplay(originalCountries);

input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    countries = originalCountries.filter(country => {
      return (
        country.name.toLowerCase().includes(value) || country.languages.some(language => language.includes(value))
      );
    });
    count.innerHTML = `${countries.length} results have been found.`;
    defaultDisplay(countries);
  });
  


function sortingUp(property) {
    const newCountries = countries.sort((a,b) => {
        if(a[property] < b[property]) return 1;
        else if(a[property] > b[property]) return -1;
        else return 0;
    });
    defaultDisplay(newCountries);
};

function sortingDown(property) {
    const newCountries = countries.sort((a,b) => {
        if(a[property] < b[property]) return -1;
        else if(a[property] > b[property]) return 1;
        else return 0;
    });
    defaultDisplay(newCountries);
};

name.addEventListener('click',() => {
    removeArrow();
    if(nameBool) {
        sortingUp('name');
        nameBool = false;
        const arrowUp = document.createElement('i');
        arrowUp.id = 'arrow';
        arrowUp.className = "fa fa-long-arrow-up";
        name.appendChild(arrowUp);
    } else {
        sortingDown('name');
        nameBool = true;
        const arrowDown = document.createElement('i');
        arrowDown.id = 'arrow';
        arrowDown.className = "fa fa-long-arrow-down";
        name.appendChild(arrowDown);
    }
});

capital.addEventListener('click',() => {
    removeArrow();
    if(capitalBool) {
        sortingUp('capital');
        capitalBool = false;
        const arrowUp = document.createElement('i');
        arrowUp.id = 'arrow';
        arrowUp.className = "fa fa-long-arrow-up";
        capital.appendChild(arrowUp);
    } else {
        sortingDown('capital');
        capitalBool = true;
        const arrowDown = document.createElement('i');
        arrowDown.id = 'arrow';
        arrowDown.className = "fa fa-long-arrow-down";
        capital.appendChild(arrowDown);
    }
});

population.addEventListener('click',() => {
    removeArrow();
    if(populationBool) {
        sortingUp('population');
        populationBool = false;
        const arrowUp = document.createElement('i');
        arrowUp.id = 'arrow';
        arrowUp.className = "fa fa-long-arrow-up";
        population.appendChild(arrowUp);
    } else {
        sortingDown('population');
        populationBool = true;
        const arrowDown = document.createElement('i');
        arrowDown.id = 'arrow';
        arrowDown.className = "fa fa-long-arrow-down";
        population.appendChild(arrowDown);
    }
});

let totalPopulation = 0;
originalCountries.forEach(country => {
    totalPopulation += country.population;
});

originalCountries.forEach(country => {
   country["populationRatio"] = country.population/totalPopulation; 
});

const objectOfLanguage = {};

originalCountries.forEach(country => {
    country.languages.forEach(language => {
         if(objectOfLanguage[language]) objectOfLanguage[language]++;
         else objectOfLanguage[language] = 1;
    });
});

const arrayOfLanguages = [];
for(const language in objectOfLanguage) {
    arrayOfLanguages.push({language: language,count: objectOfLanguage[language]});
}

//create an array that sorted by its language
const sortedArrayOfLanguages = arrayOfLanguages.sort((a,b) => b.count - a.count);
let totalLanguages = 0;
sortedArrayOfLanguages.forEach(language => {
    totalLanguages += language.count;
});
sortedArrayOfLanguages.forEach(language => {
    language.languageRatio = language.count/totalLanguages;
});

//create an array that is sorted by its population
const populationSorting = originalCountries.sort((a,b) => {
    if(a.population > b.population) return -1;
    else if (a.population <  b.population) return 1;
    else return 0;
});


const populationButton = document.querySelector('.populationSorting');
const languageButton = document.querySelector('.languagesSorting');
const visualisation = document.querySelector('.statsdisplay');

languageButton.addEventListener('click', () => {
    visualisation.innerHTML = '';
    sortedArrayOfLanguages.slice(0,10).forEach(language => {
        const row = document.createElement('div');
        row.className = 'row';
        const languageName = document.createElement('p');
        languageName.innerHTML = language.language;
        languageName.className = 'name1';
        const container = document.createElement('div');
        container.className = 'container';
        const bar = document.createElement('div');
        container.appendChild(bar);
        bar.className = 'bar';
        bar.style.width = language['languageRatio']*4*100 + '%';
        const amount = document.createElement('p');
        amount.className = 'amount';
        amount.innerHTML = language.count;
        row.appendChild(languageName);
        row.appendChild(container);
        row.appendChild(amount);
        visualisation.appendChild(row);
    });
});

const populationDisplay =  () => {
    visualisation.innerHTML = '';
    populationSorting.slice(0,10).forEach(country => {
        const row = document.createElement('div');
        row.className = 'row';
        const countryName = document.createElement('p');
        countryName.className = 'name1';
        countryName.innerHTML = country.name;
        const container = document.createElement('div');
        container.className = 'container';
        const bar = document.createElement('div');
        container.appendChild(bar);
        bar.className = 'bar';
        bar.style.width = country['populationRatio']*5*100 + '%';
        const amount = document.createElement('p');
        amount.className = 'amount';
        amount.innerHTML = country.population;
        row.appendChild(countryName);
        row.appendChild(container);
        row.appendChild(amount);
        visualisation.appendChild(row);
    });
};

populationButton.addEventListener('click',populationDisplay);
window.addEventListener('load',populationDisplay);