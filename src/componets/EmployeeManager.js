// src/components/EmployeeManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employee from './Addemplyee';
import UserTable from './UserTable';

function EmployeeManager() {
  
  return (
    <div className="App">
      <Employee  />
      <UserTable />
      
    </div>
  );
}

export default EmployeeManager;
