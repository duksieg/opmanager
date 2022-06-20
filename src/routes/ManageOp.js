import React from "react";
import LoginOp from "./LoginOp";
import Persontotel from '../components/Persontotel'
import BaseMapping from '../components/BaseMapping'
import BaseJustify from "../components/BaseJustify";
class ManageOP extends React.Component {

    constructor(props) {
        super(props);
        this.state = { token: '', opName: '', }
        this.logout = this.logout.bind(this)

    }

    // retrievedata() {
    //     let opName = sessionStorage.getItem('opName')
    //     let url = new URL('https://gunman.csd.go.th/retrievedata')
    //     url.search = new URLSearchParams({
    //         opName: opName
    //     })

    //     fetch(url).then(response => response.json())
    //         .then(data => {
    //             if (data.length != 0) {
    //                 this.setState({ data: data,selectTarget:data[0] })
    //             }
    //         })
    // }

    

  
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
                    {/* <UploadCDR opName={this.state.opName}></UploadCDR> */}
                    <BaseJustify opName={this.state.opName}></BaseJustify>
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