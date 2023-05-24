import "./App.css";
import LoginPage from "./Pages/Login/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import PDFGenerator from './Pages/ResumeTemplateGenerator/ResumeTemplateGenerator';

function App() {
  
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <div className="App">
        <LoginPage />
        {/* <PDFGenerator/> */}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
