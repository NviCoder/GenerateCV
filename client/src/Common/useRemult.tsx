import { remult } from "remult";
import { Resume } from "../shared/Resume";
import { toast } from 'react-toastify';

remult.apiClient.url = process.env.REACT_APP_SERVER_ENDPOINT;
const resumesRepo = remult.repo(Resume); 


const useRemult = () => {
    
      const addResume = async(titleInput: string, contentInput: string) => {
        try {
          await resumesRepo.insert({ title: titleInput ,content: contentInput});
          toast.success('The resume saved successfully');
        } catch (error) {
          console.error(error) 
        }
    }

    return {addResume};
}

export default useRemult;

  