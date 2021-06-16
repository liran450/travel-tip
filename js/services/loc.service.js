export const locService = {
    getLocs,
    createLocation
}
import { utilService } from './services/util-service.js'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function createLocation(name, lat, lng, weather, updatedAt = null) {
  locs.push({ 
            id: utilService.makeId(),
            name,
            lat,
            lng, 
            weather,
            createdAt: getCurrTime(),
            updatedAt 
        })
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