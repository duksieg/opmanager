import React from "react";
import { Navigate, Location } from "react-router-dom";
import Navigation from '../components/Navigation'
import { Card, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import logo from '../images/iconspar.jpeg'
import ManageOP from './ManageOp'

class LoginOp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { opName: '', opPass: '', token: '' }
        this.handleValue = this.handleValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleValue(event) {
        let name = event.target.name
        let value = event.target.value
        this.setState({ [name]: value })
    }


    async handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:3000/loginOp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }).then(response => response.json()).then(data => {
            if (data.token) {
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('opName', this.state.opName)
            }
            this.setState({ token: data.token })
        })
    }

    render() {
        let token = this.state.token
        if (token) return <ManageOP></ManageOP>
        return (
            <div className="container-fluid vh-100 homepage text-white">
                <Navigation />

                <div className="d-flex h-auto mt-5 justify-content-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className=" row mt-3 text-center justify-content-center">
                            <FormGroup controlId="formopname" className="mt-2 col-sm-8">
                                <FormLabel>
                                    ชื่อโอเปอเรชั่น
                                </FormLabel>
                                <FormControl required type='text' name="opName" value={this.state.opName} onChange={this.handleValue} />
                            </FormGroup>
                            <FormGroup controlId="formpassword" className="mt-2 col-sm-8">
                                <FormLabel>
                                    รหัสสำหรับการเข้าถึง
                                </FormLabel>
                                <FormControl required type='password' name="opPass" value={this.state.opPass} onChange={this.handleValue} />
                            </FormGroup>
                        </div>
                        <div className="row">
                            <div className="col text-center mt-4 justify-content-between">
                                <Button variant="primary" type="submit">
                                    ยืนยัน
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default LoginOp