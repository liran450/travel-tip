import { weatService } from './services/weat-service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGoToLoc = onGoToLoc;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then((map) => {
            console.log('Map is ready');
            map.addListener('click', function (e) {
                var name = prompt('Enter Name')
                var lat = e.latLng.lat()
                var lng = e.latLng.lng()
                onPanTo(lat, lng);
                onAddMarker(lat, lng)
                onGetWeather(lat, lng).then(weather => locService.createLocation(name, lat, lng, weather))
                renderWeather(name)
                onGetLocs()
            })
        })
        .catch((e) => console.log('Error: cannot init map', e));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function renderWeather(name) {
    locService.getLocs()
        .then(locs => {
            var strHTML;
            locs.filter(loc => {
                if (loc.name === name) {
                    strHTML = `${loc.weather.country} </h1><h2>${loc.weather.name} </h2>
                    <h3>${loc.weather.temp}</h3>
                    <img src=http://openweathermap.org/img/w/${loc.weather.icon}.png>`
                }
                document.querySelector('.weather-container').innerHTML = strHTML
            })

            console.log('Locations:', locs)
        })
}


function onGetWeather(lat, lng) {
    return weatService.getWeather(lat, lng)
}
// onGetWeather(lat, lng).then(weather => locService.createLocation(name, lat, lng, weather))


function onAddMarker(lat = 32.0749831, lng = 34.9120554) {
    console.log('Adding a marker');
    mapService.addMarker({ lat: lat, lng: lng });
}


function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            const strHTML = locs.map(loc => {
                return ` <tr>
                <td>Name: ${loc.name}</td>
                <td> ${loc.lat},\n${loc.lng}</td>
                <td><button>Remove</button><button>Go TO</button></td>
            </tr>`
            })

            console.log('Locations:', locs)
            document.querySelector('.locs-table').innerHTML = strHTML.join('')
            // document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}

function onGoToLoc(ev) {
    ev.preventDefault();

    var elInput = document.querySelector('.search')

    mapService.getLocationFromInput(elInput.value)
        .then(obj => {
            onPanTo(obj.lat, obj.lng)
            onAddMarker(obj.lat, obj.lng)
            onGetWeather(obj.lat, obj.lng).then(weather => locService.createLocation(obj.address, obj.lat, obj.lng, weather))
            renderWeather(obj.address)
            onGetLocs()
        }
        )
}
var hello = 'sahar-lo-limhok!!!!'