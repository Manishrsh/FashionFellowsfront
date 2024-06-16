import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap/';
import axios from 'axios';
import './home.css';

function Additeam() {
    const { register, reset,handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        try {
            console.log(data);
            const response = await axios.post('https://fashionfellows-3.onrender.com/additeam', data);
            reset({
                iteam: "",
                prize: "",
                
            }); 
            console.log("saved");
        } catch (error) {
            console.error('There was an error submitting the data:', error);
        }
    };

    return (
        <Container fluid id='main'>
            <Row className="justify-content-md-center" style={{ paddingTop: "20px" }}>
                <Col md={6}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="iteam">
                            <Form.Label>Iteam name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" {...register("iteam", { required: true, maxLength: 80 })} />
                            {errors.iteam && <Form.Text className="text-danger">Please enter a valid item name</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="prize">
                            <Form.Label style={{ marginTop: "30px" }}>Prize</Form.Label>
                            <Form.Control type="text" placeholder="Enter Prize" {...register("prize", { required: true, minLength: 1, maxLength: 12 })} />
                            {errors.prize && <Form.Text className="text-danger">Please enter a valid prize</Form.Text>}
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{ marginTop: "20px", marginBottom: "30px" }}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Additeam;
