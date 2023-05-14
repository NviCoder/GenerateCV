import { remult } from "remult";
import { Resume } from "../shared/Resume";

remult.apiClient.url = process.env.REACT_APP_SERVER_ENDPOINT;
const resumesRepo = remult.repo(Resume); 


const useRemult = () => {
    
      const addResume = async(titleInput: string, contentInput: string) => {
        try {
          const response = await resumesRepo.insert({ title: titleInput ,content: contentInput});
          
        } catch (error) {
          console.error(error) 
        }
    }

    return {addResume};
}

export default useRemult;

  