import React from 'react'
import { Card, Button, Form, Placeholder } from 'react-bootstrap'

class Targetcard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { evidenceIndex: 1, evidencelist: [] }
        this.onclickAddGroup = this.onclickAddGroup.bind(this)
        this.onhandleSubmit = this.onhandleSubmit.bind(this)
    }

    onclickAddGroup() {
        let indexEvidence = this.state.evidenceIndex
        let listEvidence = this.state.evidencelist

        listEvidence.push(
            <Form.Group key={indexEvidence} className="mt-4 row" controlId={`formchecklist_${indexEvidence}`}>
                <Form.Label>{`ของกลางชิ้นที่ ${indexEvidence}`}</Form.Label>
                <Form.Control type="text" name={`evidence_${indexEvidence}`} onChange={event => this.onhandleSubmit(indexEvidence, event)}/>
                <Form.Control type="file" name={`evidenceImg_${indexEvidence}`} onChange={event => this.onhandleSubmit(indexEvidence, event)} />
            </Form.Group>
        )
        ++indexEvidence
        this.setState({ evidencelist: listEvidence, evidenceIndex: indexEvidence })
    }

    onhandleSubmit(index,event) {
        let target = event.target
        let value = event.target.type === 'text' ? event.target.value : event.target.files[0]

    }


    componentDidMount() {
    }

    render() {
        let targetInfo = this.props.targetInfo
        let listEvidence = this.state.evidencelist
        let showevidence = []
        let evidenceShow

        if (listEvidence.length > 0) {
            listEvidence.forEach(element => {
                showevidence.push(element)
            });
            evidenceShow = showevidence
        } else {
            evidenceShow = <p>ไม่มีข้อมูลหลักฐาน</p>
        }
        return (
            <>
                <div className='container mt-5 justify-content-center'>
                    <Card>
                        <Card.Header>
                            {targetInfo.targetName}
                        </Card.Header>
                        <Card.Body>
                            <Button variant='primary' onClick={this.onclickAddGroup}>
                                เพิ่มหลักฐาน
                            </Button>
                            <form onSubmit={this.onhandleSubmit}>
                                {evidenceShow}
                                {evidenceShow.length > 0 ? <Button variant='primary' className='mt-5' type='submit'>
                                    ยืนยัน
                                </Button>:''}
                            </form>
                        </Card.Body>

                    </Card>
                </div>
            </>
        )
    }
}
export default Targetcard