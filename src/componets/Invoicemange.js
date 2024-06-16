// src/components/InvoiceContainer.js
import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import Invoice from './Invoice';

function Invoicemange() {
  const invoiceRef = useRef();
  const [invoiceData, setInvoiceData] = useState();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/addbills');
        console.log(response.data);
        // Assuming response.data is an array and you want the first item
        setInvoiceData(response.data[0]);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, []);

  const handleDownloadPdf = () => {
    const input = invoiceRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF locally (optional)
      pdf.save('invoice.pdf');

      // Generate the PDF as a Blob
      const pdfBlob = pdf.output('blob');

      // Create a FormData object and append the PDF Blob
      const formData = new FormData();
      formData.append('invoice', pdfBlob, 'invoice.pdf');

      // Send the PDF to the backend
      axios.post('http://localhost:3001/send-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('PDF successfully uploaded and sent via WhatsApp:', response.data);
      })
      .catch(error => {
        console.error('Error uploading PDF and sending via WhatsApp:', error);
      });
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <ReactToPrint
          trigger={() => <Button variant="primary">Print Invoice</Button>}
          content={() => invoiceRef.current}
        />
        <Button variant="secondary" onClick={handleDownloadPdf}>
          Download PDF
        </Button>
      </div>
      <Invoice ref={invoiceRef} invoiceData={invoiceData} />
    </div>
  );
}

export default Invoicemange;
