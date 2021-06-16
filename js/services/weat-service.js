const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

const API_WKEY = '5cbb966e302dbebcf80f2eb4fa8eb883';



function getWeather() {
    const url = `api.openweathermap.org/data/2.5/weather?lat=${locs[0].lat}&lon=${locs[0].lng}&appid=${API_WKEY}`;
    return axios.get(url)
        .then(res => res.data)
        .then(console.log())
}