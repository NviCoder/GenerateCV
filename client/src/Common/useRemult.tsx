import { remult } from "remult";
import { Resume } from "../shared/Resume";
import { toast } from 'react-toastify';
import { useState } from 'react';

remult.apiClient.url = process.env.REACT_APP_SERVER_ENDPOINT;
const resumesRepo = remult.repo(Resume); 


const useRemult = () => {
      const [isRemultLoading, setIsRemultLoading] = useState(false);

      const addResume = async(titleInput: string, contentInput: string) => {
        try {
          setIsRemultLoading(true);
          await resumesRepo.insert({ title: titleInput ,content: contentInput});
          toast.success('The resume saved successfully');
        } catch (error) {
          console.error(error)
          toast.error('An error occurred!');
        } finally {
          setIsRemultLoading(false);
        }
    }

    return {addResume, isRemultLoading};
}

export default useRemult;

  