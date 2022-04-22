import React from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, query, orderByChild, onValue } from "firebase/database"
import customicon from '../utilities/markericon'
import { useParams } from "react-router-dom";

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
const mapStyles = {
    height: '100%',
    width: '100%'
}
const polylinesCustom = (index) => {
    let colorSet = ["#000000", "#18B8DF", "#5AF789", "#B2B2B2", "#F04430"]
    return colorSet[index]
}


export class Maptracing extends React.Component {
    constructor(props) {
        super(props)
        this.applyFiltered = this.applyFiltered.bind(this)
        this.clearedFiltered = this.clearedFiltered.bind(this)
        this.renderTel = this.renderTel.bind(this)
        this.addPolylines = this.addPolylines.bind(this)
        this.state = {
            movecenter: null,
            data: [],
            filter: 'all',
            allMarker: [],
            filtered: [],
            filteredline: [],
            zoomlevel: 8,
            tellist: [],
            polylines: [],
            filterStatus: false,
        }
        this.state.lineSymbol = {
            path: "M 0,-1 0,1",
            strokeOpacity: 1,
            scale: 4,
        }
    }





    componentDidMount() {
        const dbref = query(ref(db, 'targetNorman/points'), orderByChild('LastCollectMilli'))
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
                    polylineSet.push(latlng)
                    marker_arry.push(
                        <Marker key={key} //key from firebase rtdb
                            tel={tel}
                            position={latlng}
                            datemilli={item.LastCollectMilli}
                            label={{ text: indexStr, color: 'white' }}
                            icon={{ url: customicon(indexGroup) }} />
                    )
                });
                this.addPolylines(polylineSet, indexGroup, tel)
                indexGroup++
            });
            this.setState({ allMarker: marker_arry, tellist: telSet })
        })
    }

    filteredMarker(filter) {
        let allMarker = this.state.allMarker
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

    filteredPolylines(filter) {
        let allPolylines = this.state.polylines
        let filter_arry = []
        if (filter.length > 0) {

            //filter polyline
            allPolylines.forEach(element => {
                if (filter.includes(element.props.tel)) {
                    filter_arry.push(element)
                }
            })
            console.log(filter_arry)
            return filter_arry
        }
    }


    applyFiltered() {
        var array = []
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let filtered_result = this.filteredMarker(array)
            let filtered_polylines = this.filteredPolylines(array)
            if (filtered_result.length > 0) {
                this.setState({ filterStatus: true, filtered: filtered_result, filteredline: filtered_polylines })
            } else {
                this.setState({ filterStatus: true, filtered: [] })
            }
        } else {
            this.setState({ filterStatus: false })
        }
    }


    clearedFiltered() {
        if (this.state.filterStatus) {
            this.setState({ filterStatus: false, filtered: [] })
        }
        let checked_box = document.querySelectorAll('input[type=checkbox]:checked')
        checked_box.forEach(element => {
            element.checked = false
        });
    }

    renderTel() {
        let telSet = this.state.tellist
        let tempFilter = []
        telSet.forEach((element, index) => {
            tempFilter.push(
                <div className="form-check">
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

    addPolylines(setpath, indexGroup, tel) {
        let polylineSet = this.state.polylines
        polylineSet.push(
            <Polyline
                key={indexGroup}
                tel={tel}
                path={setpath}
                strokeColor={polylinesCustom(indexGroup)}
                strokeOpacity={0.8}
                strokeWeight={2}

            />)
        this.setState({ polylines: polylineSet })
    }


    render() {
        let showMarker
        let showPolylines
        if (this.state.filterStatus && this.state.filtered.length == 0) {
            showMarker = []
        } else if (this.state.filterStatus && this.state.filtered.length > 0) {
            showMarker = this.state.filtered
            showPolylines = this.state.filteredline
        } else {
            showPolylines = this.state.polylines
            showMarker = this.state.allMarker
        }


        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        {this.renderTel()}
                        <div className="mt-3">
                            <button type="submit" onClick={this.applyFiltered} className="btn btn-dark">Apply</button>
                            <button type='submit' onClick={this.clearedFiltered} className="btn btn-dark ms-3">Clear</button>
                        </div>
                    </div>
                    <div className="col">
                        <Map

                            google={this.props.google}
                            zoom={this.state.zoomlevel}
                            center={this.state.movecenter}
                            style={mapStyles}
                            initialCenter={{ lat: 13.798995, lng: 100.562988 }}>
                            {showMarker}
                            {showPolylines}
                        </Map>
                    </div>

                </div>


            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCXGu-CH89dMLCWH7tugLG0Vb51wPaoA_c'
})(Maptracing);
