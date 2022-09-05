import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
      inputSearchCountryName: document.querySelector('input#search-box'),
      userListCountry: document.querySelector('.country-list'),
      userCountryInfo: document.querySelector('.country-info'),
}

refs.inputSearchCountryName.addEventListener('input', debounce(onSearchCountryInfo, DEBOUNCE_DELAY));

function onSearchCountryInfo(e) {
      let searchCountryInput = refs.inputSearchCountryName.value.trim();
      
      if (searchCountryInput === '') {
      refs.userCountryInfo.innerHTML = ''
      refs.userListCountry.innerHTML = ''
      return       
      }
      
      fetchCountries(searchCountryInput)
            .then(renderMarkupCountryInfo)
            .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'))
      
      e.preventDefault();
     
}

function renderMarkupCountryInfo(name) {
      if (name.length > 10 && data.length > 1) {
         Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.');   
              
      } else if (name.length > 1 && name.length <= 10) {
            clearName(refs.userCountryInfo);
            clearName(refs.userListCountry);

            refs.userListCountry.innerHTML = name
            .map(country => {
                  return `<li class="country-item">
      <img src = "${country.flags.svg}" alt="Flag country" width="45" height="30" />       
      <p class="country-name">${country.name.official}</p>
      </li>`     
      })
      .join('');
          
      } else {
            clearName(refs.userCountryInfo);
            clearName(refs.userListCountry);

            refs.userCountryInfo.innerHTML = name
            .map(country => {
            return `
      <img src = "${country.flags.svg}" alt="Flag country" width="100" />       
      <h2 class="country-name">${country.name.official}</h2>
      <dl>
      <dt>Capital:</dt><dd>${country.capital}</dd> 
      <dt>Population:</dt><dd> ${country.population}</dd>
      <dt>Languages:</dt><dd> ${Object.keys(country.languages).map(key => country.languages[key]).join(", ")}</dd>
      </dl>`
      })
      .join('');
         
      }    
}

function clearName(output) {
  output.innerHTML = '';
}