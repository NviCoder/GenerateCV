import { Configuration, OpenAIApi } from "openai"

const openAi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
    })
  )

const usePDFGenerator = () => {
      
      const getCvContent = async (firstName: string, lastName: string, email: string, phone: string, jobType: string) => {
        const request = `Hello, can you please genereate resume based on the following details? 
        full name ${firstName} ${lastName}, 
        Email: ${email}, 
        phone: ${phone}, 
        jobType: ${jobType}, `
        console.log(request);

          const response = await openAi.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: request }]
            })
          return response?.data?.choices[0]?.message?.content;
      }

      return {getCvContent};
}

export default usePDFGenerator;


