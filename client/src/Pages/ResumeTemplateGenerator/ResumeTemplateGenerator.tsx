import usePDFGenerator from './useResumeTemplateGenerator';
import Spinner from '../../Common/Sppiner';
import { Container, Input, TextArea, Button } from "./ResumeTemplateGenerator.styles";
import useRemult from '../../Common/useRemult';
import { getFullName } from '../../Common/commonUtils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function ResumeTemplateGenerator() {
  const {setPersonResumeDetails, setIsTextAreaDisabled, setResumeText, generateResumeTemplate, showPdf,
     personResumeDetails, resumeText, loading, isTextAreaDisabled} = usePDFGenerator();
  const {addResume} = useRemult();

  return (
    <>
    {loading && <Spinner backgroundColor="#ccc" />}
    <Container>
    { resumeText ? 
    <>
      <h1>{`${personResumeDetails.firstName} ${personResumeDetails.lastName}'s Resume template`}</h1>
      <Button onClick={() => setIsTextAreaDisabled((isDisabled) => !isDisabled)}>{`${isTextAreaDisabled ? "Edit"  :"Finish editing"}✍️`}</Button>
      <TextArea id="text-area" value={resumeText} onChange={(e) => setResumeText(e.target.value)} disabled={isTextAreaDisabled}/>
      <br/>
      <Button onClick={showPdf}>Show me the resume 📝</Button>
      <Button onClick={generateResumeTemplate}>Refresh template 🔄</Button>
      <Button onClick={() => setResumeText('')}>Enter new details 👨‍🎓</Button>
      <Button onClick={() => addResume(getFullName(personResumeDetails.firstName, personResumeDetails.lastName), resumeText)}>Save Resume 💾</Button>
    </> :
      <>
      <h1>Enter the following details about yourself</h1>
      <Input type="text" placeholder="First Name" value={personResumeDetails.firstName} onChange={e => setPersonResumeDetails({...personResumeDetails, firstName: e.target.value})} />
      <Input type="text" placeholder="Last Name" value={personResumeDetails.lastName} onChange={e => setPersonResumeDetails({...personResumeDetails, lastName: e.target.value})} />
      <Input type="text" placeholder="Email" value={personResumeDetails.email} onChange={e => setPersonResumeDetails({...personResumeDetails, email: e.target.value})} />
      <Input type="text" placeholder="Phone" value={personResumeDetails.phone} onChange={e => setPersonResumeDetails({...personResumeDetails, phone: e.target.value})} />
      <Input type="text" placeholder="Age" value={personResumeDetails.age} onChange={e => setPersonResumeDetails({...personResumeDetails, age: e.target.value})} />
      <Input type="text" placeholder="Address" value={personResumeDetails.address} onChange={e => setPersonResumeDetails({...personResumeDetails, address: e.target.value})} />
      <Input type="text" placeholder="Job Type" value={personResumeDetails.jobType} onChange={e => setPersonResumeDetails({...personResumeDetails, jobType: e.target.value})} />
      <Button onClick={generateResumeTemplate}>Generate Resume template 📝</Button>
      </>
    }
    <ToastContainer />
  </Container>
  </>
  );
}

export default ResumeTemplateGenerator;