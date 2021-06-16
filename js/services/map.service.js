// import { axios } from "../../lib/axios";

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocationFromInput
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    // console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            // console.log('google available');
            gMap = new google.maps.Map(
                    document.querySelector('#map'), {
                        center: { lat, lng },
                        zoom: 15
                    })
                // console.log('Map!', gMap);
            return gMap
        })
}
// console.log(gMap);

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDo5CV8LZHlMGoyjo2qaDbYwjrlrs9zwEE'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    // console.log(API_KEY);
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getLocationFromInput(value) {
    var valToArray = value.split(' ')
    var valToString = valToArray.join('+')

    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${valToString}&key=AIzaSyDo5CV8LZHlMGoyjo2qaDbYwjrlrs9zwEE`
    return axios.get(url)
        .then(res => res.data)
        .then(data => data.results[0])
        .then((res) => res = {
            address: res.formatted_address,
            lng: res.geometry.location.lng,
            lat: res.geometry.location.lat
        })
}
