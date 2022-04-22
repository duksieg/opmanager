import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { Link, useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import Navigation from '../components/Navigation'
import { getDatabase, ref, query, orderByChild, onValue } from "firebase/database"
import customicon from '../utilities/markericon'

const firebaseConfig = {
    apiKey: "AIzaSyCXGu-CH89dMLCWH7tugLG0Vb51wPaoA_c",
    authDomain: "operation-333705.firebaseapp.com",
    databaseURL: "https://operation-333705-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "operation-333705",
    storageBucket: "operation-333705.appspot.com",
    messagingSenderId: "995869264631",
    appId: "1:995869264631:web:9331079e9606ef2644a1f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const containerStyle = {

    height: '100vh',
    width: '100%'
};

const center = { lat: 13.798995, lng: 100.562988 }


function Gmap() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCXGu-CH89dMLCWH7tugLG0Vb51wPaoA_c"
    })
    const [map, setMap] = useState(null)
    const [marker, setMarker] = useState([])
    const [telSet, setTelSet] = useState([])
    const [polylines, setPolylines] = useState([])
    const [filterStatus, setFilterStatus] = useState(false)
    const [filterline, setFilterline] = useState([])
    const [filterMarker, setFilterMarker] = useState([])
    const [focusMarker, setFocusMarker] = useState(null)

    const param = useParams()

    const polylinesCustom = (index) => {
        let colorSet = ["#000000", "#18B8DF", "#5AF789", "#B2B2B2", "#F04430"]
        return colorSet[index]
    }


    const onLoad = React.useCallback(function callback(map) {
        map.setCenter(center)
        if(param.opname!=null){
            mountComponent()
        }
        setMap(map)
    }, [])



    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const filteredMarker = (filter) => {
        let allMarker = marker
        let filter_arry = []
        if (filter.length > 0) {

            //filter marker
            allMarker.forEach(element => {
                if (filter.includes(element.props.tel)) {
                    filter_arry.push(element)
                }
            })
            return filter_arry
        }
    }

    const filteredPolylines = (filter) => {
        let allPolylines = polylines
        let filter_arry = []
        if (filter.length > 0) {

            //filter polyline
            allPolylines.forEach(element => {
                if (filter.includes(element.props.tel)) {
                    filter_arry.push(element)
                }
            })
            return filter_arry
        }
    }

    const applyFiltered = () => {
        var array = []
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let filtered_markers = filteredMarker(array)
            let filtered_polylines = filteredPolylines(array)
            if (filtered_markers.length > 0) {
                setFilterMarker(filtered_markers)
                setFilterStatus(true)
                setFilterline(filtered_polylines)
            } else {
                setFilterStatus(true)
                setFilterMarker([])
                setFilterline([])
            }
        } else {
            setFilterStatus(false)
        }
    }


    const addPolylines = (setpath, indexGroup, tel) => {
        let polylineSet = polylines
        polylineSet.push(
            <Polyline
                key={indexGroup}
                tel={tel}
                path={setpath}
                strokeColor={polylinesCustom(indexGroup)}
                strokeOpacity={0.8}
                strokeWeight={2}

            />)
        setPolylines(polylineSet)
    }


    const clearedFiltered = () => {
        if (filterStatus) {
            setFilterStatus(false)
            setFilterMarker([])
            setFilterline([])
        }
        let checked_box = document.querySelectorAll('input[type=checkbox]:checked')
        checked_box.forEach(element => {
            element.checked = false
        });
    }

    const renderTel = () => {
        let tempFilter = []
        telSet.forEach((element, index) => {
            tempFilter.push(
                <div className="form-check" key={element}>
                    <input className="form-check-input" type="checkbox" value={element} name='filter_type[]' />
                    <label className="form-check-label">
                        {element}
                    </label>
                    <img src={customicon(index)}></img>
                </div>
            )
        });
        return (tempFilter)

    }

    const mountComponent = () => {
        const dbref = query(ref(db, `${param.opname}/points`), orderByChild('LastCollectMilli'))
        onValue(dbref, (snapshot) => {
            let rawdata = snapshot.val()
            let marker_arry = []
            let telSet = []

            let indexGroup = 0
            //level 1 each tel
            Object.entries(rawdata).forEach(entry_1 => {
                const [tel, tel_value] = entry_1;
                telSet.push(tel)
                let polylineSet = []
                //level 2 each point
                Object.entries(tel_value).forEach((entry_2, index) => {
                    let indexStr = index.toString()
                    const [key, item] = entry_2;
                    let splitPosition = item.position.toString().split(",")
                    let latlng = { lat: parseFloat(splitPosition[0].trim()), lng: parseFloat(splitPosition[1].trim()) }
                    let marker =
                        <Marker key={key} //key from firebase rtdb
                            tel={tel}
                            position={latlng}
                            datemilli={item.LastCollectMilli}
                            itemprop={item}
                            label={{ text: indexStr, color: 'white', fontSize: '14px' }}
                            icon={{ url: customicon(indexGroup) }}
                            onClick={() => { setFocusMarker(item) }}
                        />
                    polylineSet.push(latlng)
                    marker_arry.push(marker)
                });
                addPolylines(polylineSet, indexGroup, tel)
                indexGroup++
            });
            setMarker(marker_arry)
            setTelSet(telSet)
        })
    }

    const MarkerInfo = () => {
        let getDatetime
        if (focusMarker.LastCollectResult == "" && focusMarker.stampdatetime != "") {
            getDatetime = new Date(focusMarker.stampdatetime).toUTCString()
            console.log(getDatetime)
        } else {
            getDatetime = getDatetime = new Date(focusMarker.LastCollectMilli).toUTCString()
        }

        return (
            <div>
                <p>เบอร์โทรศัพท์ {focusMarker.MSISDN}</p>
                <p>ข้อมูล ณ เวลา {getDatetime}</p>
                <p>Operator {focusMarker.OperatorName}</p>
            </div>)
    }

    const FinalrenderMarker = () => {
        let showMarker
        if (filterStatus && filterMarker.length == 0) {
            showMarker = []
        } else if (filterStatus && filterMarker.length > 0) {
            showMarker = filterMarker
        } else {
            showMarker = marker
        }
        return (showMarker)

    }

    const FinalrenderPolyline = () => {
        let showPolylines
        if (filterStatus && filterline.length == 0) {
            showPolylines = []
        } else if (filterStatus && filterline.length > 0) {
            showPolylines = filterline
        } else {
            showPolylines = polylines
        }
        return (showPolylines)

    }


    return isLoaded ? (
        <div className='container-fluid vh-100'>
            <div className='row'>
                <div className="col-2 justify-content-center">
                    {renderTel()}
                    <div className="d-flex mt-3 justify-content-around">
                        <button type="submit" onClick={applyFiltered} className="btn btn-dark">Apply</button>
                        <button type='submit' onClick={clearedFiltered} className="btn btn-dark">Clear</button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Link className='btn btn-dark mt-3' to="/opmanager" > หน้าแรก</Link>
                        </div>
                </div>
                <div className='col'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        <FinalrenderMarker></FinalrenderMarker>
                        <FinalrenderPolyline></FinalrenderPolyline>
                    </GoogleMap>
                </div>
                <div className='col-2'>
                    {focusMarker != null ? <MarkerInfo /> : <></>}
                </div>
            </div>

        </div>

    ) : <></>
}



export default Gmap