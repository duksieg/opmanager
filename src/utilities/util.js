import LatLon from 'geodesy/latlon-spherical.js';
import { firebaseConfig } from './config'
const geolocated = `https://www.googleapis.com/geolocation/v1/geolocate?key=${firebaseConfig.apiKey}`

export const getBaseArea = async (baseobj) => {
    let reqGeo
    if ((baseobj.LAC != '' && baseobj.MCC != '' && baseobj.MNC != '' && baseobj.Subscriber4G5G != '') &&(baseobj.cellId !='' || baseobj.LCID !='' )) {
        reqGeo = {
            "radioType": "lte",
            "considerIp": false,
            "cellTowers": [
                {
                     "cellId": baseobj.CellId != '' ? baseobj.CellId : baseobj.LCID ,
                     "locationAreaCode": baseobj.LAC,
                     "mobileCountryCode": baseobj.MCC,
                     "mobileNetworkCode": baseobj.MNC,
                }
            ]
        }
        // let response = await fetch(geolocated, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(reqGeo)
        // })
        // if (response.status == 200) {
        //     let result = await response.json()
        //     console.log(result)
        //     return result.accuracy
        // }
         return 1000
    } else {
        return 1000
    }


}


export const getDistance = (origin, dest) => {
    try {
        let p1 = new LatLon(origin.lat, origin.lng);
        let p2 = new LatLon(dest.lat, dest.lng);
        let distance = p1.distanceTo(p2)
        return distance
    } catch (err) {
        return false
    }

}

export const testbasearea = async () => {
    let reqGeo = {
            "radioType": "wcdma",
            "considerIp": false,
            "cellTowers": [
                {   "cellId":1816,
                     "locationAreaCode": 5603,
                     "mobileCountryCode": 520,
                     "mobileNetworkCode": 4,
                }
            ]
        }
        let response = await fetch(geolocated, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqGeo)
        })
        if (response.status == 200) {
            let result = await response.json()
            console.log(result)
            return result
        }
        else return 2000


}
