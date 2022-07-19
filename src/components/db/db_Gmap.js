import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { firebasedb } from '../../utilities/config';
import { ref, query, onValue } from 'firebase/database'
import { exportIcon, exportETC } from '../../utilities/markericon'
import { useNavigate } from 'react-router-dom';
const containerStyle = {
    height: '100vh',
    width: '100%'
};
export default function DB_Gmap() {
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCXGu-CH89dMLCWH7tugLG0Vb51wPaoA_c"
    })
    const [center, setCenter] = useState({ lat: 13.798995, lng: 100.562988 })
    const [maindata, setMaindata] = useState([])
    const [map, setMap] = useState(null)
    const [markers, setMarkers] = useState([])
    const [zoomOption, setZoomOption] = useState(13)
    const [searchPoint, setSearchPoint] = useState('')
    const [focusMarker, setFocusMarker] = useState(null)
    let navigate= useNavigate()
    const starCountRef = ref(firebasedb, 'tester1/data');

    const onMount = () => {
        onValue(starCountRef, (snapshot) => {
            let maindata = []
            let rawdata = snapshot.val()
            Object.values(rawdata).forEach((entry1) => {
                maindata.push(entry1)
            })
            setMaindata(maindata)
        })
    }
    useEffect(() => {
        let tempMain = maindata
        let intialMarker = []
        tempMain.forEach(element => {
            let latlng = { lat: parseFloat(element.LAT), lng: parseFloat(element.LONG) }
            let markerItem =
                <Marker key={element.target} //key from firebase rtdb
                    position={latlng}
                    itemprop={element}
                    label={{ text: element.target, color: 'white', fontSize: '14px' }}
                    icon={{ url: exportIcon(0) }}
                    onClick={() => { onclickMarker(element, element.target) }}
                />
            intialMarker.push(markerItem)
        });
        setMarkers(intialMarker)
    }, [maindata])

    const onclickMarker = (item, index) => {
        return navigate("../dashboard/1A1", { replace: true,state:{datasource:item}});
    }

    const onLoad = (map) => {
        map.setCenter(center)
        onMount()
        setMap(map)
    }
    const onUnmount = (map) => {
        setMap(null)
    }
    const onSearching = () => {
        let tempMain = maindata
        tempMain.forEach((item) => {
            if (item.target === searchPoint) {
                let latlng = { lat: parseFloat(item.LAT), lng: parseFloat(item.LONG) }
                setCenter(latlng)
                setZoomOption(17)
            }
        })
    }

    return isLoaded ? (
        <div>
            <div className='container'>
                <div className='text-center justify-content-center mt-3 d-flex'>
                    <input type={'text'} className="form-control w-25" onChange={(e) => { setSearchPoint(e.target.value) }}></input>
                    <div className='btn btn-dark' onClick={onSearching} > ค้นหาจุดค้น</div>
                </div>
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoomOption}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {markers == null ? '' : markers}
            </GoogleMap>
        </div>

    ) : <></>
}