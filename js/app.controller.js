import { weatService } from './services/weat-service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then((map) => {
            console.log('Map is ready');
            map.addListener('click', function(e) {
                var lat = e.latLng.lat()
                var lng = e.latLng.lng()
                onPanTo(lat, lng);
                onAddMarker(lat, lng)
                onGetWeather(lat, lng)
                
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

function onGetWeather(lat, lng) {
    weatService.getWeather(lat, lng)
}

function onAddMarker(lat = 32.0749831, lng = 34.9120554) {
    console.log('Adding a marker');
    mapService.addMarker({ lat: lat, lng: lng });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            const strHTML = locs.map(loc => {
                return ` <tr>
                <td>${loc.name}</td>
                <td>${loc.lat}</td>
                <td>${loc.lng}</td>
            </tr>`
            })

            console.log('Locations:', locs)
            document.querySelector('.locs').innerHTML = strHTML.join('')
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

mapService.getMap()
    .then(a => console.log(a))

function onClickMap() {

}

function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}



// function onGetLocs() {}