import { storageService } from './storage-service.js'
import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'

export const locService = {
    getLocs,
    createLocation
}

const DB_KEY = "location_DB"

var locs = storageService.load(DB_KEY) || []

function createLocation(name, lat, lng, weather, updatedAt = null) {
    locs.push({
        id: utilService.makeId(),
        name,
        lat: lat,
        lng: lng,
        weather,
        createdAt: getCurrTime(),
        updatedAt
    })
    storageService.save(DB_KEY, locs)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 500)
    });
}

function getCurrTime() {
    var time = Date.now();
    return time
}