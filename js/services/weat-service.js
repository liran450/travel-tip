export const weatService = {
    getWeather
}



const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

const API_KEY = '5cbb966e302dbebcf80f2eb4fa8eb883';

const lat = locs[0].lat.toFixed(1)
const lng = locs[0].lng.toFixed(1)


getWeather()
    .then(console.log)
    .catch(console.log)

function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
    console.log(url);
    return axios.get(url)
        .then(res => res.data)
}