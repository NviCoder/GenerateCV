import { Configuration, OpenAIApi } from "openai";
import { PersonResumeDetails } from "./ResumeTemplateGenerator.types";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Resume } from "../../shared/Resume";

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  })
);

const initialDetails: PersonResumeDetails = {
  firstName: "Nvi",
  lastName: "Coder",
  email: "Nvi@coder.com",
  phone: "065652532222",
  jobType: "Electric engineer student",
  age: "26",
  address: "123 Main Street, Anytown, USA",
};

const useResumeTemplateGenerator = (resumes: Resume[] | undefined) => {
  const [personResumeDetails, setPersonResumeDetails] = useState<PersonResumeDetails>(initialDetails);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(true);
  const [activeResume, setActiveResume] = useState<Resume>();

  useEffect(() => {
    if ((!activeResume && resumes) || (resumes && resumes.every((r) => activeResume?.id !== r.id))) {
      setActiveResume(resumes.at(0));
    }
  }, [resumes]);

  const getCvContent = async (personResumeDetails: PersonResumeDetails) => {
    const { firstName, lastName, email, phone, jobType, age, address } = personResumeDetails;
    const request = `Hello, can you please genereate resume based on the following details? 
        full name ${firstName} ${lastName}, 
        Email: ${email}, 
        phone: ${phone}, 
        jobType: ${jobType},
        age: ${age},
        address: ${address},`;

    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: request }],
    });
    return response?.data?.choices[0]?.message?.content;
  };

  const getResumeTemplateContent = async () => {
    setLoading(true);
    let response;
    try {
      response = await getCvContent(personResumeDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    return response || "Error was occured";
  };

  const generateResumeTemplate = async () => {
    const response = await getResumeTemplateContent();
    setResumeText(response);
  };

  const showPdf = () => {
    const doc = new jsPDF();
    // Add header section
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text(`${personResumeDetails.firstName} ${personResumeDetails.lastName}'s Resume`, 20, 20);

    // Add divider line
    doc.setDrawColor(100, 100, 100);
    doc.setLineWidth(0.5);
    doc.line(20, 70, 190, 70);

    // // Add education section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont("bold");
    doc.text(resumeText || "No data?", 20, 80);

    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    const currentpdfUrl = URL.createObjectURL(pdfBlob);
    window.open(currentpdfUrl);
  };

  return {
    setPersonResumeDetails,
    setIsTextAreaDisabled,
    setResumeText,
    generateResumeTemplate,
    showPdf,
    setActiveResume,
    personResumeDetails,
    resumeText,
    loading,
    isTextAreaDisabled,
    activeResume,
  };
};

export default useResumeTemplateGenerator;
