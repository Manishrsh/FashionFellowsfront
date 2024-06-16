import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './componets/Navbar';
import Addbills from './componets/Addbills';
import EmployeeManager from './componets/EmployeeManager';
import LoginPage from './componets/LoginPage'
import Invoicemange from './componets/Invoicemange.js'
import HomeMange from './componets/HomeMange.js'
import Home from './componets/Home.js';
import Additeam from './componets/Additeam.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Invoice from './componets/Invoice.js';
import PerInvoice from './componets/PerInvoice.js';

const theme = createTheme({
  // Customize your theme here
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
		      <Route path='/' element={<Home/>} />
          <Route path='/home' element={<div>hi</div>} />
          <Route path='/addbills' element={<Addbills />} />
          <Route path='/addemplyee' element={<EmployeeManager />} />
		      <Route path='/invoice' element={<Invoicemange />} />
          <Route path='/additeam' element={< Additeam/>} />
          <Route path='/perinvoice' element={<PerInvoice/>} />


        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </div>

  );
}

export default App;
