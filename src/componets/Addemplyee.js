import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './EmployeeForm.css'; // Import CSS file for styling
import UserTable from './UserTable';

export default function Employee() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async data => {
    try {
      const response = await axios.post('http://localhost:3001/user', data)
       .then(response =>{ window.location.reload(); }) 
    } catch (error) {
      console.error('There was an error submitting the data:', error);
    }
  };
  
  return (
    <>
    <div className="form-container">
      <h2>Employee Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
        <div className="form-group">
          <label htmlFor="firstName">Name</label>
          <input 
            type="text" 
            id="firstName" 
            {...register("firstName", { required: true, maxLength: 80 })} 
          />
          {errors.firstName && <span className="error-message">This field is required</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            {...register("email")} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input 
            type="number" 
            id="otp" 
            {...register("otp", { required: true })} 
          />
          {errors.otp && <span className="error-message">This field is required</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="companyCode">Company Code</label>
          <input 
            type="text" 
            id="companyCode" 
            {...register("companyCode")} 
          />
        </div>
        
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      
    </div>
    
    </>
  );
}
