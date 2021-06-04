'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*
const getCoutryData = function (country) {
   const request = new XMLHttpRequest();
   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
   request.send();
   request.addEventListener('load', function () {
      console.log(this.responseText);

      const [data] = JSON.parse(this.responseText);
      console.log(data);

      const html = `
		<article class="country">
			<img class="country__img" src="${data.flag}" />
			<div class="country__data">
				<h3 class="country__name">${data.name}</h3>
				<h4 class="country__region">${data.region}</h4>
				<p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
               1
            )}</p>
				<p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
				<p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
			</div>
		</article>
		`;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
   });
};



const getCoutryAndNeighbour = function (country) {
   const request = new XMLHttpRequest();
   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
   request.send();
   request.addEventListener('load', function () {
      console.log(this.responseText);

      const [data] = JSON.parse(this.responseText);
      console.log(data);

      // render country 1
      renderCountry(data);

      // Get neighbour country
      const [neighbour] = data.borders;
      if (!neighbour) return;

      console.log(neighbour);
      // AJAX call 2
      const request2 = new XMLHttpRequest();
      request2.open(
         'GET',
         `https://restcountries.eu/rest/v2/name/${neighbour}`
      );
      request2.send();

      request2.addEventListener('load', function () {
         const [data2] = JSON.parse(this.responseText);

         renderCountry(data2, 'neighbour');
      });
   });
};

getCoutryAndNeighbour('china');
----------------------------------------------------------------------------------------------------------------------------------------------------------
*/

const whereAmI = function (lat, lng) {
   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(response => {
         if (!response.ok) throw new Error('Data not received');
         return response.json();
      })
      .then(data => {
         console.log(data, `You are in ${data.city}, ${data.country}.`);
         getCoutryData(data.country);
      })
      .catch(err => console.log(`Something went wrong (${err})`));
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
   return fetch(url).then(response => {
      if (!response.ok)
         throw new Error(`${errorMsg} (${response.status}) TEST MESSAGE`);

      return response.json();
   });
};

const renderError = function (msg) {
   countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = function (data, className = '') {
   const html = `
		<article class="country ${className}">
			<img class="country__img" src="${data.flag}" />
			<div class="country__data">
				<h3 class="country__name">${data.name}</h3>
				<h4 class="country__region">${data.region}</h4>
				<p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
               1
            )}</p>
				<p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
				<p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
			</div>
		</article>
		`;
   countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCoutryData = function (country) {
   getJSON(
      `https://restcountries.eu/rest/v2/name/${country}`,
      'Country not found'
   )
      .then(data => {
         renderCountry(data[0]);
         const neighbour = data[0].borders[0];
         console.log(neighbour);
         if (!neighbour) throw new Error('No neighbour found');

         return getJSON(
            `https://restcountries.eu/rest/v2/name/${neighbour}`,
            'Country not found'
         );
      })

      .then(data2 => renderCountry(data2[0], 'neighbour'))
      .catch(err => {
         console.log(err);
         renderError(err);
      })
      .finally(() => {
         countriesContainer.style.opacity = 1;
      });
};
//whereAmI(52.508, 13.381);
//whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
