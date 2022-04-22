
import { React, useState } from 'react'
import { Form, Button } from 'react-bootstrap'



function Targetinfo(props) {
    const [inputFields, setInputFields] = useState([
        { name: '', file: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        let value = event.target.type === 'text' ? event.target.value : event.target.files[0]
        data[index][event.target.name] = value
        setInputFields(data)
    }
    const addFields = () => {
        let newfield = { name: '', file: '' }
        setInputFields([...inputFields, newfield])
    }
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const submit = (e) => {
        e.preventDefault();

        inputFields.forEach(element => {
            const formData = new FormData();
            formData.append('filestore', element.file)
            formData.append('opName', props.opName)
            formData.append('item',element.name)
            fetch('http://localhost:4000/updateevidence', {
                method: 'POST',
                body: formData
            })
        });

        console.log(inputFields)
    }
    return (
        <div className="container">
            <form onSubmit={submit}>
                <Button variant='primary' onClick={addFields}>เพิ่มหลักฐาน</Button>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <Form.Group className="mt-4 row" >
                                <Form.Label>ของกลาง</Form.Label>
                                <Form.Control type="text" name='name' value={input.name} onChange={event => handleFormChange(index, event)} />
                                <Form.Control type="file" name='file' onChange={event => handleFormChange(index, event)} />
                                <Button onClick={() => removeFields(index)}>ลบ</Button>
                            </Form.Group>
                        </div>
                    )
                })}
                <Button variant='secondary' onClick={submit}>ยืนยัน</Button>
            </form>
        </div>
    );
}

export default Targetinfo