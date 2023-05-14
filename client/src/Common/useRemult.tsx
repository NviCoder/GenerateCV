import { remult } from "remult";
import { Resume } from "../shared/Resume";

remult.apiClient.url = process.env.REACT_APP_SERVER_ENDPOINT;
const resumesRepo = remult.repo(Resume); 


const useRemult = () => {
    
      const addResume = async(titleInput: string, contentInput: string) => {
        // add a new product to the backend database
        await resumesRepo.insert({ title: titleInput ,content: contentInput});
    
        // fetch products from backend database
        const resumes = await resumesRepo.find();
        console.log(resumes);
    }

    return {addResume};
}

export default useRemult;

  