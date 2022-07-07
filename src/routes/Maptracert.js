/* global google */
import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, Polyline, Circle } from '@react-google-maps/api';
import { Link, useParams } from 'react-router-dom';
import {  ref, query, orderByChild, onValue } from "firebase/database"
import { exportIcon, exportETC } from '../utilities/markericon'
import * as util from '../utilities/util'
import { firebasedb, matchTel, circleoption } from '../utilities/config'


// Initialize Firebase
const db = firebasedb

const containerStyle = {
    minHeight: '800px',
    width: 'auto'
};


function Gmap() {
    const { isLoaded } = useLoadScript({
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
    const [center, setCenter] = useState({ lat: 13.798995, lng: 100.562988 })
    const [otherPoint, setOtherPoint] = useState([])
    const [areaSet, setArea] = useState([])
    const [specificPoint, setSpecificPoint] = useState()
    const param = useParams()


    const onLoad = React.useCallback(function callback(map) {
        map.setCenter(center)
        if (param.opname != null) {
            setArea([])
            setFocusMarker(null)
            setSpecificPoint(null)
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
                if (filter.includes(element.props.tel) || filter.includes(element.props.category)) {
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
        telSet.forEach((obj, index) => {
            tempFilter.push(
                <div className="form-check" key={obj.tel}>
                    <input className="form-check-input" type="checkbox" id={'checkbox_' + obj.tel} value={obj.tel} name='filter_type[]' />
                    <label className="form-check-label" htmlFor={'checkbox_' + obj.tel}>
                        {obj.tel} {obj.name != '' ? obj.name : ''}
                    </label>
                    <img className='ms-3' src={exportIcon(index)}></img>
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
                const [key, value] = entry_1;
                let telObj = {
                    tel: key,
                    name: '',
                }

                //tele no
                if (key.match(matchTel)) {
                    let polylineSet = []
                    let lastPoint = Object.keys(value).length
                    let marker

                    //level 2 each point
                    Object.entries(value).forEach((entry_2, index) => {
                        let indexStr = index.toString()
                        const [subkey, item] = entry_2;
                        if (subkey != 'targetname') {
                            if (item.position != "") {
                                let latlng = { lat: parseFloat(item.position.lat), lng: parseFloat(item.position.lng) }
                                marker =
                                    <Marker key={subkey} //key from firebase rtdb
                                        tel={key}
                                        position={latlng}
                                        datemilli={item.LastCollectMilli}
                                        itemprop={item}
                                        label={{ text: indexStr, color: 'white', fontSize: '14px' }}
                                        icon={{ url: exportIcon(indexGroup) }}
                                        onClick={() => { onclickMarker(item, subkey) }}
                                    />
                                polylineSet.push(latlng)
                                marker_arry.push(marker)
                                if (lastPoint - 1 == index) {
                                    lastPointProcess(marker)
                                }
                            }
                        } else {
                            lastPointProcess(marker)
                            telObj.name = item
                        }
                    })
                    addPolylines(polylineSet, indexGroup, key)
                    telSet.push(telObj)
                    indexGroup++
                } else {
                    setOtherPoints(key, value)
                }
            })

            setMarker(marker_arry)
            setCenter(marker_arry[marker_arry.length - 1].props.position)
            setTelSet(telSet)
        })
    }
    const lastPointProcess = async (item) => {
        let areadistance = await util.getBaseArea(item)
        circleoption.radius = areadistance
        let newCircle =
            <Circle
                key={item.key}
                center={item.props.position}
                options={circleoption}
                tel={item.props.tel}
            />
        setArea(areaSet => [...areaSet, newCircle])
    }
    const setOtherPoints = (type, value) => {
        let current_type = []
        let allOthers = otherPoint
        Object.entries(value).forEach(entry_2 => {
            const [subkey, item] = entry_2;
            let latlng = { lat: parseFloat(item.position.lat), lng: parseFloat(item.position.lng) }
            let marker =
                <Marker key={subkey} //key from firebase rtdb
                    category={type}
                    position={latlng}
                    itemprop={item}
                    icon={{ url: exportETC(item.type) }}
                    onClick={() => { setFocusMarker(item) }}
                />
            current_type.push(marker)
        })
        setOtherPoint(allOthers.concat(current_type))
    }

    const addPolylines = (setpath, indexGroup, tel) => {
        let polylineSet = polylines
        polylineSet.push(
            <Polyline
                key={indexGroup}
                tel={tel}
                path={setpath}
                strokeOpacity={0.8}
                strokeWeight={2}

            />)
        setPolylines(polylineSet)
    }

    const onclickMarker = async (focusMarker, uniKey) => {
        let latlng = { lat: parseFloat(focusMarker.position.lat), lng: parseFloat(focusMarker.position.lng) }
        let basearea = await util.getBaseArea(focusMarker)
        circleoption.radius = basearea
        let currentCircle = <Circle key={uniKey} center={latlng} options={circleoption} />
        setSpecificPoint(currentCircle)
        setFocusMarker(focusMarker)
    }
    useEffect(() => {
        console.log(areaSet)
    })

    const onclickDistance = (focusMarker) => {
        let originPoint = { lat: parseFloat(focusMarker.position.lat), lng: parseFloat(focusMarker.position.lng) }
        let arryOtherpoint = otherPoint.length > 0 ? otherPoint : []
        let distanceSet = []
        arryOtherpoint.forEach(element => {
            let subDN = focusMarker.MSISDN.substring(2, focusMarker.MSISDN.length)
            if (element.props.itemprop.tel.includes(subDN)) {
                let elementpoint = { lat: parseFloat(element.props.position.lat), lng: parseFloat(element.props.position.lng) }
                let distance = util.getDistance(originPoint, elementpoint)
                let stText
                if (distance > 1000) {
                    distance = (Number(distance / 1000).toFixed(2)).toLocaleString()
                    stText = <p>- ห่างจาก {element.props.itemprop.rel} หรือ {element.props.itemprop.adr} ระยะห่าง {distance} กม.</p>
                } else {
                    distance = (Number(distance).toFixed(2)).toLocaleString()
                    stText = <p>- ห่างจาก {element.props.itemprop.rel} หรือ {element.props.itemprop.adr} ระยะห่าง {distance} เมตร</p>
                }
                distanceSet.push(stText)
            }


        });
        return distanceSet
    }


    const MarkerInfo = () => {
        let getDatetime
        if (focusMarker.LastCollectResult != "" && focusMarker.LastCollectMilli != "") {
            getDatetime = focusMarker.LastCollectResult
        } else {
            getDatetime = new Date(focusMarker.stampdatetime).toLocaleString()
        }
        //static point
        if (focusMarker.rel != null) {
            let getdatetime
            if(focusMarker.datetime !=''){
                 getDatetime =  new Date(focusMarker.datetime).toUTCString()
            }
            return (
                <div>
                    <h2>ข้อมูลสถานที่</h2>
                    <p>เบอร์โทรศัพท์ที่เกี่ยวข้อง : {focusMarker.tel} </p>
                    <p>ความสัมพันธ์ : {focusMarker.rel}</p>
                    <p>รายละเอียดสถานที่ : {focusMarker.adr}</p>
                    <p>เวลา:{getDatetime}</p>
                </div>
            )
        }
        //base point 
        else if (focusMarker.MSISDN != null || focusMarker.MSISDN != "") {
            let distanceSet = onclickDistance(focusMarker)
            return (
                <div>
                    <p>เบอร์โทรศัพท์ {focusMarker.MSISDN}</p>
                    <p>ข้อมูล ณ เวลา {getDatetime}</p>
                    <p>Operator {focusMarker.OperatorName}</p>
                    <p>-----------------------------------</p>
                    <div className='overflow-auto' style={{ maxHeight: 200 }} >
                        {distanceSet != null ? distanceSet : ''}
                    </div>
                </div>)
        } else {
            return (
                <div>
                    <p>{focusMarker.LastCollectResult}</p>
                </div>
            )
        }
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

    useEffect(() => {
        console.log(specificPoint)
    })
    const renderMap = () => {
        return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <FinalrenderMarker></FinalrenderMarker>
                <FinalrenderPolyline></FinalrenderPolyline>
                {specificPoint}
                {areaSet != undefined ? areaSet : ''}
                {otherPoint != undefined ? otherPoint : ''}
            </GoogleMap>)
    }


    return isLoaded ? (
        <div className='container-fluid mt-4 vh-100'>
            <div className='row'>
                <div className="col-lg-3 col-sm-auto justify-content-center">
                    <div className='card'>
                        <div className='card-header'>
                            เบสโทรศัพท์
                        </div>
                        <div className='card-body'>
                            {renderTel()}
                        </div>
                    </div>
                    <div className='shadow-lg p-3 my-2 bg-white rounded text-wrap'>
                        {focusMarker != null ? <MarkerInfo /> :
                            <p>
                                เลือกหมุดบนแผนที่เพื่อดูข้อมูล
                            </p>}
                    </div>
                    <div className="d-flex mt-3 justify-content-around">
                        <button type="submit" onClick={applyFiltered} className="btn btn-dark">กรองการค้นหา</button>
                        <button type='submit' onClick={clearedFiltered} className="btn btn-dark">ล้างการค้นหา</button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Link className='btn btn-dark mt-3' to="/" > หน้าแรก</Link>
                    </div>
                </div>
                <div className='col'>
                    {renderMap()}
                </div>
            </div>

        </div>

    ) : <></>
}



export default Gmap