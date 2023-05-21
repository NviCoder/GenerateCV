import useResumeTemplateGenerator from "./useResumeTemplateGenerator";
import Spinner from "../../Common/Sppiner";
import { Container, Input, TextArea, Button, Sidebar, MainContent, ContainerB } from "./ResumeTemplateGenerator.styles";
import useRemult from "../../Common/useRemult";
import { getFullName } from "../../Common/commonUtils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Resume } from "../../shared/Resume";
import SidebarItem from "./SIdebarItem/SidebarItem";

function ResumeTemplateGenerator() {
  const { addResume, deleteResume, updateResume, isRemultLoading, resumes } = useRemult();
  const {
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
  } = useResumeTemplateGenerator(resumes);

  return (
    <>
      {(loading || isRemultLoading) && <Spinner backgroundColor="#ccc" />}
      {resumeText ? (
        <>
          <ContainerB>
            <Sidebar>
              {resumes?.length === 0 && <h5 style={{color: "white"}}>No Resumes...</h5>}
              {resumes
                ?.sort((a: Resume, b: Resume) => b.creationTime.getTime() - a.creationTime.getTime())
                .map((resume) => (
                  <SidebarItem
                    key={resume.id}
                    resume={resume}
                    isActive={activeResume?.id === resume?.id}
                    onClick={() => {
                      const currentResume = resumes.find((givenResume: Resume) => resume.id === givenResume.id);
                      setActiveResume(currentResume);
                    }}
                    onDelete={deleteResume}
                    setActiveResume={setActiveResume}
                  />
                ))}
            </Sidebar>
            <MainContent>
              <h1>{`${personResumeDetails.firstName} ${personResumeDetails.lastName}'s Resume template`}</h1>
              <Button
                onClick={() => {
                  setIsTextAreaDisabled((isDisabled) => !isDisabled);
                  activeResume && !isTextAreaDisabled && updateResume(activeResume);
                }}
              >{`${isTextAreaDisabled ? "Edit" : "Finish editing"}✍️`}</Button>
              <TextArea
                id="text-area"
                value={activeResume?.content || resumeText}
                onChange={(e) => {
                  if (activeResume) {
                    setActiveResume({ ...activeResume!, content: e.target.value });
                    return;
                  }
                  resumeText && setResumeText(e.target.value);
                }}
                disabled={isTextAreaDisabled}
              />
              <br />
              <Button onClick={showPdf}>Show me the resume 📝</Button>
              <Button onClick={generateResumeTemplate}>Refresh template 🔄</Button>
              <Button onClick={() => setResumeText("")}>Enter new details 👨‍🎓</Button>
              {!activeResume && (
                <Button
                  onClick={() => {
                    if (resumeText) {
                      addResume(getFullName(personResumeDetails.firstName, personResumeDetails.lastName), resumeText);
                      return;
                    }
                    updateResume(activeResume!);
                  }}
                >
                  Save Resume 💾
                </Button>
              )}
            </MainContent>
          </ContainerB>
        </>
      ) : (
        <>
          <Container>
            <h1>Enter the following details about yourself</h1>
            <Input
              type="text"
              placeholder="First Name"
              value={personResumeDetails.firstName}
              onChange={(e) =>
                setPersonResumeDetails({
                  ...personResumeDetails,
                  firstName: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={personResumeDetails.lastName}
              onChange={(e) =>
                setPersonResumeDetails({
                  ...personResumeDetails,
                  lastName: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Email"
              value={personResumeDetails.email}
              onChange={(e) =>
                setPersonResumeDetails({
                  ...personResumeDetails,
                  email: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Phone"
              value={personResumeDetails.phone}
              onChange={(e) =>
                setPersonResumeDetails({
                  ...personResumeDetails,
                  phone: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Age"
              value={personResumeDetails.age}
              onChange={(e) =>
                setPersonResumeDetails({
                  ...personResumeDetails,
                  age: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Address"
              value={personResumeDetails.address}
              onChange={(e) =>
                setPersonResumeDetails({
                  ...personResumeDetails,
                  address: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Job Type"
              value={personResumeDetails.jobType}
              onChange={(e) =>
                setPersonResumeDetails({
                  ...personResumeDetails,
                  jobType: e.target.value,
                })
              }
            />
            <Button onClick={generateResumeTemplate}>Generate Resume template 📝</Button>
          </Container>
        </>
      )}
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
}

export default ResumeTemplateGenerator;
