import './App.css';
import LoginPage from './Pages/Login/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

// import PDFGenerator from './Pages/ResumeTemplateGenerator/ResumeTemplateGenerator';

function App() {
  return (
    
    <div className="App">
      <GoogleOAuthProvider clientId='asdasda'>
      <LoginPage />
      {/* <PDFGenerator/> */}
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
