import React from "react";
import LoginOp from "./LoginOp";
import { Button, Form } from 'react-bootstrap'
import Targetinfo from "../components/TargetInfo";

class ManageOP extends React.Component {

    constructor(props) {
        super(props);
        this.state = { token: '', data: [], excelUpload: '', opName: '', selectTarget: '' }
        this.logout = this.logout.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.handleSelectTarget = this.handleSelectTarget.bind(this)
        this.onUploadExcel = this.onUploadExcel.bind(this)
        this.createSelectItems = this.createSelectItems.bind(this)

    }

    retrievedata() {
        let opName = sessionStorage.getItem('opName')
        let url = new URL('https://gunman.csd.go.th/retrievedata')
        url.search = new URLSearchParams({
            opName: opName
        })

        fetch(url).then(response => response.json())
            .then(data => {
                if (data.length != 0) {
                    this.setState({ data: data,selectTarget:data[0] })
                }
            })
    }

    onUploadExcel() {
        const formData = new FormData();
        formData.append('filestore', this.state.excelUpload)
        formData.append('opName', this.state.opName)
        fetch('http://localhost:3000/importexcel', {
            method: 'POST',
            body: formData
        })
    }

    handleFileUpload(event) {
        const files = event.target.files
        this.setState({ excelUpload: files[0] })
    }

    handleSelectTarget(e) {
        e.preventDefault()
        let data = this.state.data
        let targetObj = data.find(element=>{
           if( element.no == e.target.value)  
           return true
        })
        this.setState({selectTarget:targetObj})
    }

    componentDidMount() {
        let tokenStr = sessionStorage.getItem('token')
        let tokenOpName = sessionStorage.getItem('opName')
        if (tokenStr) {
            this.setState({ token: tokenStr, opName: tokenOpName })
            this.retrievedata()
        }
    }

    logout() {
        sessionStorage.removeItem('token')
        this.setState({ token: '' })
    }

    

    createSelectItems() {
        let items = []
        if (this.state.data.length > 0) {
            this.state.data.forEach(element => {
                items.push(<option key={element.no} value={element.no}>{element.targetName}</option>)
            });
        } 
        return items
    }
    render() {
        let token = this.state.token
        let dataFound = this.state.data.length
        if (!token) {
            return (<LoginOp></LoginOp>)
        } else {
            return (
                <>
                    <div className="container">
                        <form onSubmit={this.onUploadExcel}>
                            <div className="mb-3">
                                <label>
                                    Upload Excel
                                    <input type="file" className="form-control" onChange={this.handleFileUpload} />
                                </label>
                            </div>
                            <div>
                                <Button variant="primary" type="submit">
                                    Upload Excel
                                </Button>
                                <Button variant="primary" type='button' onClick={this.logout}>
                                    Logout
                                </Button>
                            </div>
                        </form>

                    </div>

                    {dataFound > 0 ?
                        <div className="container">
                            <Form.Select defaultValue='1' onChange={this.handleSelectTarget}>
                                {this.createSelectItems()}
                            </Form.Select>
                            <Targetinfo targetinfo = {this.state.selectTarget} opName ={this.state.opName}></Targetinfo>
                        </div> : <div className="container">
                            <div className="row justify-content-center text-danger text-center m-auto">
                                ไม่มีข้อมูล
                            </div>
                        </div>
                    }
                </>
            )
        }
    }
}

export default ManageOP