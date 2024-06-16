import React, { useRef, useEffect, useState , userid } from 'react';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Invoice from './Invoice';

function Home() {
  const invoiceRef = useRef();
  const navigate = useNavigate()

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://fashionfellows-3.onrender.com/allbills');
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const data = [
    { name: 'A', value: 50 },
    { name: 'B', value: 30 },
    { name: 'C', value: 20 }
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const handleSearch = () => {
    const filteredData = users.filter(
      item => item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredData);
  };

  const handleInputChange = event => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleInvoice = data => {
    console.log('Generating invoice for:', data);
    navigate('/perinvoice', { state: { invoiceData: data } });
  };

  return (
    <Container fluid>
      <Row className="mb-3 mt-3">
        <Col sm={6}>
          <Form>
            <Form.Control
              type="text"
              placeholder="Search by name"
              className="mr-sm-2"
              value={searchTerm}
              onChange={handleInputChange}
              id="input"
            />
          </Form>
        </Col>
        <Button variant="outline-success" onClick={handleSearch}>Search</Button>
      </Row>
      <Row>
        <Col lg={8} md={12}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} onClick={() => handleInvoice(user)}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.items[0].iteam}</td>
                  <td>{user.items[0].prize}</td>
                  <td>{user.items[0].quantity}</td>
                  <td>{user.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col lg={4} md={12} className="d-flex justify-content-center align-items-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
