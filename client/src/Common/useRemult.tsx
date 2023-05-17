import { remult } from "remult";
import { Resume } from "../shared/Resume";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

remult.apiClient.url = process.env.REACT_APP_SERVER_ENDPOINT;
const resumesRepo = remult.repo(Resume);

const useRemult = () => {
    const [isRemultLoading, setIsRemultLoading] = useState(false);
    const [resumes, setResumes] = useState<Resume[]>();

    useEffect(() => {
        fetchResumes();
    }, []);
    

    const fetchResumes = async () => {
        try {
            const response = await resumesRepo.find();
            setResumes(response);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred!");
        }
    };

    const addResume = async (titleInput: string, contentInput: string) => {
        try {
            setIsRemultLoading(true);
            await resumesRepo.insert({ title: titleInput, content: contentInput });
            toast.success("The resume saved successfully");
            fetchResumes();
        } catch (error) {
            console.error(error);
            toast.error("An error occurred!");
        } finally {
            setIsRemultLoading(false);
        }
    };

    const deleteResume = async (inputResume: Resume) => {
        try {
            setIsRemultLoading(true);
            await resumesRepo.delete(inputResume);
            toast.success("The resume was deleted successfully");
            fetchResumes();
        } catch (error) {
            console.error(error);
            toast.error("An error occurred!");
        } finally {
            setIsRemultLoading(false);
        }
    };

    return { addResume, deleteResume, isRemultLoading, resumes };
};

export default useRemult;
