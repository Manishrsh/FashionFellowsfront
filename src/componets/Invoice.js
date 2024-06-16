import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

const Invoice = React.forwardRef(({ invoiceData }, ref) => {
  console.log(ref)
  console.log('called');
  console.log(invoiceData)
  if (!invoiceData) {
    return <p>Loading...</p>;
  }

  const {
    firstName,
    mobileNumber,
    items=[], // Update to receive an array of items
    createdAt,
  } = invoiceData;
console.log(invoiceData)
  const subtotal = 50
  const total = 100

  const date = new Date();
  const today = date.getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()]; // getMonth() returns month index (0-11)
  const alldate = `${today} ${month}`; // Concatenates date and month name

  return (
    <Container ref={ref} className="p-4" style={{ border: 'solid 2px grey', marginTop: '20px' }}>
      <Row className="mb-4">
        <Col>
          <h1>Fashion Fellow</h1>
          <p>Kapad Market 5-1</p>
        </Col>
        <Col className="text-right">
          <h2>Invoice</h2>
          <p><strong>Invoice #:</strong> 1</p>
          <p><strong>Invoice Date:</strong> {alldate}</p>
          <p><strong>Due Date:</strong> No</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h5>Bill To:</h5>
          <p>{firstName}</p>
          <p>{mobileNumber}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.iteam}</td>
                  <td>{item.quantity}</td>
                  <td>{item.prize}</td>
                  <td>{item.discount}</td>
                  <td>{(item.prize * item.quantity) - item.discount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col xs={6}>
          <Table>
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td>{subtotal}</td>
              </tr>
              <tr>
                <td><strong>Total:</strong></td>
                <td><strong>{total}</strong></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <p>Thank you for your business!</p>
        </Col>
      </Row>
    </Container>
  );
});

export default Invoice;
