import React from 'react';
import './App.css';
import LoginPage from './Pages/Login/LoginPage';
import GeneraePdf from './Pages/GeneratorPage/PDFGenerator';

function App() {
  return (
    <div className="App">
      {/* <LoginPage /> */}
      <GeneraePdf/>
    </div>
  );
}

export default App;
