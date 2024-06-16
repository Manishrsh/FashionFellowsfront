import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap/';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa"; // Assuming you have react-icons installed

import './home.css';

function Addbill() {
    const { register, handleSubmit, setValue, reset, control, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const onSubmit = async data => {
        try {
            // Prepare the final data to be submitted
            const finalData = {
                ...data,
                items: selectedItems
            };

            console.log(finalData);
            await axios.post('http://localhost:3001/addbill', finalData);
            navigate('/invoice');
        } catch (error) {
            console.error('There was an error submitting the data:', error);
        }
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3001/allitemas');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    const handleItemChange = (event) => {
        const selectedItem = items.find(item => item._id === event.target.value);
        setValue("prize", selectedItem?.prize || ""); // Auto-fill the prize field
    };

    const handleAddItem = () => {
        const itemValue = watch("item");
        const prizeValue = watch("prize");
        const quantityValue = watch("quantity");
        const discountValue = watch("discount");

        const selectedItem = items.find(item => item._id === itemValue);
        const itemData = {
            iteam: selectedItem?.iteam || '',
            prize: prizeValue,
            quantity: quantityValue,
            discount: discountValue,
        };

        setSelectedItems([...selectedItems, itemData]);
        reset({
            item: "",
            prize: "",
            quantity: "",
            discount: ""
        }); // Reset the fields after adding the item
    };

    return (
        <Container fluid id='main'>
            <Row className="justify-content-md-center" style={{ paddingTop: "20px" }}>
                <Col md={6}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" {...register("firstName", { required: true, maxLength: 80 })} />
                            {errors.firstName && <Form.Text className="text-danger">First name is required</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="mobileNumber">
                            <Form.Label style={{ marginTop: "30px" }}>Mobile Number</Form.Label>
                            <Form.Control type="tel" placeholder="Enter Mobile Number" {...register("mobileNumber", { required: true, minLength: 6, maxLength: 12 })} />
                            {errors.mobileNumber && <Form.Text className="text-danger">Please enter a valid mobile number</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="item">
                            <Form.Label style={{ marginTop: "30px" }}>Item</Form.Label>
                            <Form.Control as="select" {...register("item", { required: true })} onChange={handleItemChange}>
                                <option value="">Select an item</option>
                                {items.map((item) => (
                                    <option key={item._id} value={item._id}>{item.iteam}</option>
                                ))}
                            </Form.Control>
                            {errors.item && <Form.Text className="text-danger">Please select an item</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="prize">
                            <Form.Label style={{ marginTop: "30px" }}>Prize</Form.Label>
                            <Controller
                                name="prize"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control type="number" placeholder="Enter Prize" {...field} readOnly />
                                )}
                            />
                        </Form.Group>

                        <Form.Group controlId="quantity">
                            <Form.Label style={{ marginTop: "30px" }}>Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Enter Quantity" {...register("quantity")} />
                        </Form.Group>

                        <Form.Group controlId="discount">
                            <Form.Label style={{ marginTop: "30px" }}>Discount</Form.Label>
                            <Form.Control type="number" placeholder="Enter Discount" {...register("discount")} />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={handleAddItem} style={{ marginTop: "20px", marginBottom: "30px" }}>
                            <FaPlus /> Add Item
                        </Button>

                        <Button variant="primary" type="submit" style={{ marginTop: "20px", marginBottom: "30px" }}>
                            Submit
                        </Button>
                    </Form>

                    <div style={{ marginTop: "30px" }}>
                        <h5>Selected Items</h5>
                        <ul>
                            {selectedItems.map((item, index) => (
                                <li key={index}>
                                    {item.iteam} - {item.quantity} x ${item.prize} - Discount: ${item.discount}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col> 
            </Row>
        </Container>
    );
}

export default Addbill;
