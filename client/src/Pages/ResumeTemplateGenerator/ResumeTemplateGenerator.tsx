import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import usePDFGenerator from './useResumeTemplateGenerator';
import Spinner from '../../Common/Sppiner';
import { Container, Input, TextArea, Button } from "./ResumeTemplateGeneratorStyles";


function PDFGenerator() {
  const [firstName, setFirstName] = useState('Elad');
  const [lastName, setLastName] = useState('Nevee');
  const [email, setEmail] = useState('asdasd@asdasd.com');
  const [phone, setPhone] = useState('05252212335');
  const [jobType, setjobType] = useState("electric engineer student");
  const [cvText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(true);


  const {getCvContent} = usePDFGenerator();

  const getResumeTemplateContent = async () => {
    setLoading(true);
    let response;
    try {
      response = await getCvContent(firstName, lastName, email, phone, jobType);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    return response || "Error was occured";
  }

  const generateResumeTemplate = async () => {
    const response = await getResumeTemplateContent();
    setResumeText(response);
  }
  
  const showPdf = () => {
    const doc = new jsPDF();   
    // Add header section
    doc.setFontSize(16);
    doc.setFont('bold');
    doc.text(`${firstName} ${lastName}'s Resume`, 20, 20);

    // Add divider line
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.line(20, 70, 190, 70);
    
    // // Add education section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont('bold');
    doc.text(cvText || "No data?", 20, 80);
    
    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const currentpdfUrl = URL.createObjectURL(pdfBlob);
    window.open(currentpdfUrl)
  }


  return (
    <>
    {loading && <Spinner backgroundColor="#ccc" />}
    <Container>
    { cvText ? 
    <>
      <h1>{`${firstName} ${lastName}'s Resume template`}</h1>
      <Button onClick={() => setIsTextAreaDisabled((isDisabled) => !isDisabled)}>{`${isTextAreaDisabled ? "Edit"  :"Finish editing"}✍️`}</Button>
      <TextArea id="text-area" value={cvText} onChange={(e) => setResumeText(e.target.value)} disabled={isTextAreaDisabled}/>
      <br/>
      <Button onClick={showPdf}>Show me the resume 📝</Button>
      <Button onClick={generateResumeTemplate}>Refresh template 🔄</Button>
      <Button onClick={() => setResumeText('')}>Enter new details 👨‍🎓</Button>
    </> :
      <>
      <h1>Enter the following details about yourself</h1>
      <Input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <Input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <Input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <Input type="text" placeholder="Job Type" value={jobType} onChange={e => setjobType(e.target.value)} />
      <Button onClick={generateResumeTemplate}>Generate Resume template 📝</Button>
      </>
    }
  </Container>
  </>
  );
}

export default PDFGenerator;