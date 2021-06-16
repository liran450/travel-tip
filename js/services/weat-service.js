'use strict'

export const weatService = {
    getWeather
}

import { storageService } from './storage-service.js'



const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

const API_KEY = '5cbb966e302dbebcf80f2eb4fa8eb883';



function getWeather(lat, lng) {
    // const locs = storageService.load||[]
    lat = lat.toFixed(1)
    lng = lng.toFixed(1)
        // if(locs){
        //     const newLocs = locs.filter(loc=> (loc.lat ===lat&& loc.lng ===lng))
        //     return newLocs[0].weather
        // }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
    console.log(url);
    return axios.get(url)
        .then(res => res.data)
        .then(data => {
            return {
                name: data.name,
                icon: data.weather[0].icon,
                country: data.sys.country,
                temp: ((data.main.temp - 273.15).toFixed(0))
            }
        })
        // .then(temp => (temp - 273.15).toFixed(0))
}