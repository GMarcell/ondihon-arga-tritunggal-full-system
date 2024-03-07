import { useEffect, useState } from 'react';
import langContext from './hooks/langContext'
import NewNavbar from './components/NewNavbar'
import Footer from './components/Footer'
import FloatingButton from './components/FloatingButton'

function LangController({ children }) {
  const [language, setLanguage] = useState("en");

  return (
    <>
      <langContext.Provider value={{ language }}>
        <NewNavbar lang={language} setLang={setLanguage}/>
        {children}
        <Footer lang={language}/>
        <FloatingButton/>
      </langContext.Provider>
    </>
  );
}

export default LangController;
