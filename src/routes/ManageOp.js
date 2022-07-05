import React from "react";
import LoginOp from "./LoginOp";
import {firebasedb} from "../utilities/config"
import Persontotel from '../components/Manage/Persontotel'
import BaseMapping from '../components/Manage/BaseMapping'
import BaseJustify from "../components/Manage/BaseJustify";
import { ref,get } from "firebase/database";
import AddWanted from "../components/Manage/AddWanted";
const firebaseRTDB = firebasedb

class ManageOP extends React.Component {

    constructor(props) {
        super(props);
        this.state = { token: '', opName: '',maindata:null}
        this.logout = this.logout.bind(this)

    }



  
    componentDidMount() {
        let tokenStr = sessionStorage.getItem('token')
        let tokenOpName = sessionStorage.getItem('opName')
        if (tokenStr) {
            this.setState({ token: tokenStr, opName: tokenOpName })

        }
    }

    logout() {
        sessionStorage.removeItem('token')
        this.setState({ token: '' })
    }

    
    render() {
        let token = this.state.token
        if (!token) {
            return (<LoginOp></LoginOp>)
        } else {
            return (
                <>
                    <div className="container">
                    <Persontotel opName={this.state.opName}></Persontotel>
                    <BaseMapping opName={this.state.opName}></BaseMapping>
                    <AddWanted opName = {this.state.opName}/>
                    {/* <UploadCDR opName={this.state.opName}></UploadCDR> */}
                    {/* <BaseJustify opName={this.state.opName}></BaseJustify> */}
                    <button className="btn-primary mt-4" type="button" onClick={this.logout}>
                                logout
                            </button>
                    </div>


                </>
            )
        }
    }
}

export default ManageOP