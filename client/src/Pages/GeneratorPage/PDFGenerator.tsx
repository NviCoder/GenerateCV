import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function PDFGenerator() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFillColor('yellow');
    // Draw a rectangle to fill the document with the gradient color
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
  
    // Add header section
    doc.setFontSize(16);
    doc.setFont('bold');
    doc.text(`${firstName} ${lastName}'s Resume`, 20, 20);
    
    // Add personal information section
    doc.setFontSize(12);
    doc.setFont('normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Name: ${firstName} ${lastName}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Phone: ${phone}`, 20, 60);
    
    // Add divider line
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.line(20, 70, 190, 70);
    
    // Add education section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont('bold');
    doc.text('Education', 20, 80);
    
    // Add education details
    doc.setFontSize(12);
    doc.setFont('normal');
    doc.text('Bachelor of Science in Computer Science', 20, 90);
    doc.text('XYZ University', 20, 100);
    doc.text('Graduated May 2020', 20, 110);
    
    // Add skills section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont('bold');
    doc.text('Skills', 20, 120);
    
    // Add skills details
    doc.setFontSize(12);
    doc.setFont('normal');
    doc.text('JavaScript, React, HTML, CSS', 20, 130);
    
    // Save and open the document
    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }

  return (
    <div>
      <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />

      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
}

export default PDFGenerator;