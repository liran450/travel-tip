import { storageService } from './storage-service.js'
import { utilService } from './util-service.js'

export const locService = {
    getLocs,
    createLocation
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function createLocation(name, lat, lng, weather, updatedAt = null) {
  locs.push({ 
            id: utilService.makeId(),
            name,
            lat: lat.toFixed(6),
            lng: lng.toFixed(6), 
            weather,
            createdAt: getCurrTime(),
            updatedAt 
        })
        console.log(locs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getCurrTime() {
    var time = Date.now();
    return time
}