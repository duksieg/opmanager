import React from "react";
import { Link } from "react-router-dom";
import Navigation from '../components/Navigation'
import { Button, FormGroup, FormControl, FormLabel, Alert, Row, Col } from "react-bootstrap";
import logo from '../images/gunman.png'

class CreateOp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { opName: '', opPass: '', alertexist: false, alertsuccess: false, created: false, message: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleValue = this.handleValue.bind(this)
    }

    handleValue(event) {
        let name = event.target.name
        let value = event.target.value
        this.setState({ [name]: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:3000/create-rtdb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
            .then(data => {
                console.log(data.message)
                if (data.message == 'already exist') {
                    this.setState({ alertexist: true, message: 'ชื่อโอเปอเรชั่นมีการใช้งานแล้ว' })
                } else if (data.message == 'success') {
                    this.setState({ alertsuccess: true, created: true })
                } else {
                    this.setState({ alertexist: true, message: data.message })
                }
            }
            )
    }

    render() {
        return (
            <div className="container-fluid vh-100 homepage text-white">
                {this.state.alertexist ? <Alert className="mt-5 text-center" onClose={() => this.setState({ alertexist: false })} variant="danger" dismissible>{this.state.message}</Alert> : ''}
                {this.state.alertsuccess ? <Alert className="mt-5 text-center" onClose={() => this.setState({ alertsuccess: false })} variant="success" dismissible>สร้างโอเปอเรชั่นเรียบร้อย</Alert> : ''}

                <div className="d-flex h-auto mt-5 justify-content-center">
                        <form onSubmit={this.handleSubmit}>
                            <div className=" row text-center justify-content-center">
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
                                        สร้างโอเปอเรชั่น
                                    </Button>
                                    {this.state.created ?
                                        <Link to="/">
                                            <div className="btn btn-secondary" >
                                                กลับหน้าแรก
                                            </div>
                                        </Link> : ''
                                    }
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        )
    }

}
export default CreateOp