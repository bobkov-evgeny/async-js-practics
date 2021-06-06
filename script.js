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


const getPosition = function () {
   return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
   });
};

const whereAmI = function (lat, lng) {
   getPosition()
      .then(pos => {
         const { latitude: lat, longitude: lng } = pos.coords;

         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      })
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

whereAmI();
//whereAmI(19.037, 72.873);
//whereAmI(-33.933, 18.474);
*/
/*
const lotteryPromise = new Promise(function (resolve, reject) {
   console.log('Lottery draw is happening');

   setTimeout(function () {
      if (Math.random() >= 0.5) {
         resolve('You WIN !');
      } else {
         reject(new Error('You lost your money.'));
      }
   }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Real wolrd example: promisifying setTimeout
const wait = function (seconds) {
   return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

wait(2)
   .then(() => {
      console.log('I waited for 2 seconds');
      return wait(1);
   })
   .then(() => console.log('I waited for 1 second'));

Promise.resolve('abc').then(res => console.log(res));
Promise.reject('abc').catch(err => console.error(err));

let currentImg;

const wait = function (seconds) {
   return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const createImage = function (imgPath) {
   return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;
      img.addEventListener('load', function () {
         document.querySelector('.images').append(img);
         currentImg = img;
         resolve(img);
      });
      img.addEventListener('error', function (error) {
         reject(new Error(`Something broke (${error})`));
      });
   });
};

createImage('/img/img-1.jpg')
   .then(() => wait(2))
   .then(() => (currentImg.style.display = 'none'))
   .then(() => wait(2))
   .then(() => createImage('/img/img-2.jpg'))
   .then(() => wait(2))
   .then(() => (currentImg.style.display = 'none'))
   .then(() => wait(2))
   .then(() => createImage('/img/img-3.jpg'))
   .then(() => wait(2))
   .then(() => (currentImg.style.display = 'none'))
   .catch(err => console.error(`Error OCCURED(${err})`));
console.log('done');

const renderError = function (msg) {
   countriesContainer.insertAdjacentText('beforeend', msg);
   countriesContainer.style.opacity = 1;
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
   countriesContainer.style.opacity = 1;
};

const whereAmI = async function () {
   try {
      const coords = await getPosition();
      const { latitude: lat, longitude: lng } = coords.coords;

      const resGeo = await fetch(
         `https://geocode.xyz/${lat},${lng}?geoit=json`
      );
      if (!resGeo.ok) throw new Error('Problem getting location data');
      const dataGeo = await resGeo.json();
      console.log(dataGeo);

      const response = await fetch(
         `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
      );
      if (!response.ok) throw new Error('Problem getting country');
      const data = await response.json();
      console.log(data);
      renderCountry(data[0]);

      return `2: You are in ${dataGeo.city}, ${dataGeo.country}.`
   } catch (err) {
      renderError(`Something went wrong (${err})`);

      throw err;
   }
};

const getPosition = function () {
   return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
   });
};

//console.log('1: Will get location');
//whereAmI().then(msg => console.log(msg)).catch(err => console.log(`Error is: ${err}`).finally(() => console.log('3: Finished getting location'));


(async function() {
  try {
    const msg = await whereAmI();
    console.log(msg);
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
})();

const getJSON = function (url, errorMsg = 'Something went wrong') {
   return fetch(url).then(response => {
      if (!response.ok)
         throw new Error(`${errorMsg} (${response.status}) TEST MESSAGE`);

      return response.json();
   });
};

const get3Countries = async function(c1, c2, c3) {
  try {

    // const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${c1}`)
    // const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${c2}`)
    // const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)

    const data = await Promise.all([getJSON(`https://restcountries.eu/rest/v2/name/${c1}`), getJSON(`https://restcountries.eu/rest/v2/name/${c2}`), getJSON(`https://restcountries.eu/rest/v2/name/${c3}`)])

    console.log(data.map(data => data[0].capital));

  } catch (err) {

    console.log(err);

  }
}

get3Countries('russia', 'usa', 'moldova');


const getJSON = function (url, errorMsg = 'Something went wrong') {
   return fetch(url).then(response => {
      if (!response.ok)
         throw new Error(`${errorMsg} (${response.status}) TEST MESSAGE`);

      return response.json();
   });
};

(async function() {
  const response = await Promise.race([getJSON(`https://restcountries.eu/rest/v2/name/italy`), getJSON(`https://restcountries.eu/rest/v2/name/russia`), getJSON(`https://restcountries.eu/rest/v2/name/australia`)])
  console.log(response[0].capital)
})();

const timeout = function(sec) {
  return new Promise(function(_, reject) {
    setTimeout(function(){
      reject(new Error('Request took too long!'))
    }, sec * 1000)
  })
};


Promise.race([getJSON(`https://restcountries.eu/rest/v2/name/italy`), timeout(0.01)]).then(x => console.log(x[0])).catch(err => console.log(err));
*/

let currentImg;

const wait = function (seconds) {
   return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const createImage = function (imgPath) {
   return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;
      img.addEventListener('load', function () {
         document.querySelector('.images').append(img);
         currentImg = img;
         resolve(img);
      });
      img.addEventListener('error', function (error) {
         reject(new Error(`Something broke (${error})`));
      });
   });
};

// const loadNPause = async function() {
//   try {
//     let img = await createImage('/img/img-1.jpg');
//     console.log(img)
//     await wait(2);
//     img.style.display = 'none'

//     img = await createImage('/img/img-2.jpg');
//     await wait(2);
//     img.style.display = 'none'

//     img = await createImage('/img/img-3.jpg');
//     await wait(2);
//     img.style.display = 'none'
//   } catch(err) {
//     console.log(err);
//   }
// };
// loadNPause();

const loadAll = async function(imgPathArray) {
  try {
    
    const imgs = await imgPathArray.map(async imgPath => {
      const test = await createImage(imgPath)
      test.classList.add('parallel')
      return test
      })
  
    console.log(await Promise.all(imgs))
    
  } catch(err) {
    console.log(err);
  }
  
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])
