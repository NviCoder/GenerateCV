import { Configuration, OpenAIApi } from "openai";
import { PersonResumeDetails } from "./ResumeTemplateGenerator.types";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Resume } from "../../shared/Resume";
import useRemult from "../../Common/useRemult";
import { getFullName } from "../../Common/commonUtils";

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

const useResumeTemplateGenerator = () => {
  const [personResumeDetails, setPersonResumeDetails] = useState<PersonResumeDetails>(initialDetails);
  const [loading, setLoading] = useState(false);
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(true);
  const [activeResume, setActiveResume] = useState<Resume>();

  const { addResume, resumes, deleteResume, updateResume } = useRemult();

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
    let response;
    try {
      response = await getCvContent(personResumeDetails);
    } catch (error) {
      console.error(error);
    }
    return response || "Error was occured";
  };

  const generateResumeTemplate = async (isRefresh: boolean = false) => {
    setLoading(true);
    try {
      const openAiResponse = await getResumeTemplateContent();
      const title = getFullName(personResumeDetails.firstName, personResumeDetails.lastName);
      if (!isRefresh) {
        const response = await addResume(title, openAiResponse);
        response && setActiveResume(response);
        return;
      }
      const newResume = { ...activeResume!, content: openAiResponse };
      await updateResume({ ...activeResume!, content: openAiResponse });
      setActiveResume(newResume);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    doc.text(activeResume?.content || "No data?", 20, 80);

    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    const currentpdfUrl = URL.createObjectURL(pdfBlob);
    window.open(currentpdfUrl);
  };

  return {
    setPersonResumeDetails,
    setIsTextAreaDisabled,
    generateResumeTemplate,
    showPdf,
    setActiveResume,
    updateResume,
    deleteResume,
    personResumeDetails,
    loading,
    isTextAreaDisabled,
    activeResume,
    resumes,
  };
};

export default useResumeTemplateGenerator;
