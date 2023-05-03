import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import usePDFGenerator from './usePDFGenerator';
import styled from 'styled-components';
import Spinner from '../../Common/Sppiner';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

function PDFGenerator() {
  const [firstName, setFirstName] = useState('Elad');
  const [lastName, setLastName] = useState('Nevee');
  const [email, setEmail] = useState('asdasd@asdasd.com');
  const [phone, setPhone] = useState('05252212335');
  const [jobType, setjobType] = useState("electric engineer student");
  const [pdfUrl, setPdfUrl] = useState(''); 
  const [loading, setLoading] = useState(false);

  const {getCvContent} = usePDFGenerator();


  const generatePdf = async() => {
    setLoading(true);
    let response;
    try {
      response = await getCvContent(firstName, lastName, email, phone, jobType);
      console.log("response", response);
    } catch (error) {
      console.error(error);
      setLoading(false);
      return
    }
    
  
    const doc = new jsPDF();

   
    // Add header section
    doc.setFontSize(16);
    doc.setFont('bold');
    doc.text(`${firstName} ${lastName}'s Resume`, 20, 20);
    
    // // Add personal information section
    // doc.setFontSize(12);
    // doc.setFont('normal');
    // doc.setTextColor(100, 100, 100);
    // doc.text(`Name: ${firstName} ${lastName}`, 20, 40);
    // doc.text(`Email: ${email}`, 20, 50);
    // doc.text(`Phone: ${phone}`, 20, 60);
    
    // Add divider line
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.line(20, 70, 190, 70);
    
    // // Add education section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont('bold');
    doc.text(response || "No data?", 20, 80);
    
    // // Add education details
    // doc.setFontSize(12);
    // doc.setFont('normal');
    // doc.text('Bachelor of Science in Computer Science', 20, 90);
    // doc.text('XYZ University', 20, 100);
    // doc.text('Graduated May 2020', 20, 110);
    
    // // Add skills section
    // doc.setFontSize(14);
    // doc.setTextColor(0, 0, 0);
    // doc.setFont('bold');
    // doc.text('Skills', 20, 120);
    
    // // Add skills details
    // doc.setFontSize(12);
    // doc.setFont('normal');
    // doc.text('JavaScript, React, HTML, CSS', 20, 130);
    
 
    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const currentpdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(currentpdfUrl);
    setLoading(false);
  }

  return (
    <Container>
    {loading ?  <Spinner backgroundColor="#ccc" /> :
    <div>
      {pdfUrl ? <button onClick={() => window.open(pdfUrl)}>Show me the resume 📝</button> :
      <> 
      <Input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <Input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <Input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <Input type="text" placeholder="Job Type" value={jobType} onChange={e => setjobType(e.target.value)} />
      <Button onClick={generatePdf}>Generate PDF</Button>
      </>
    }
    </div>
  }
  </Container>
  );
}

export default PDFGenerator;