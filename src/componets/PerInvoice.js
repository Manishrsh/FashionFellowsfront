import React from 'react';
import { useLocation } from 'react-router-dom';
import Invoice from './Invoice';

function PerInvoice() {
  const location = useLocation();
  const { invoiceData } = location.state || {};

  return (
    <div>
      <h1>Invoice Page</h1>
      {invoiceData ? (
        <Invoice invoiceData={invoiceData} />
      ) : (
        <p>No invoice data available</p>
      )}
    </div>
  );
}

export default PerInvoice;
