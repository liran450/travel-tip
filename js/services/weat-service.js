'use strict'

export const weatService = {
    getWeather
}



const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

const API_KEY = '5cbb966e302dbebcf80f2eb4fa8eb883';




// getWeather(37.2, 35.3)
//     .then(console.log)
//     .catch(console.log)

function getWeather(lat, lng) {
    lat = lat.toFixed(1)
    lng = lng.toFixed(1)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
    console.log(url);
    return axios.get(url)
        .then(res => res.data)
}