import { useEffect, useState } from 'react';
import langContext from './hooks/langContext'
import NewNavbar from './components/NewNavbar'
import Footer from './components/Footer'
import FloatingButton from './components/FloatingButton'

function LangController({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('language') ?? "en");

  const handleSetLanguage = (lang) => {
    setLanguage(lang)
    if (lang) {
      localStorage.setItem('language', lang)
    } else {
      localStorage.removeItem('language')
    }
  }

  return (
    <>
      <langContext.Provider value={{ language }}>
        <NewNavbar lang={language} setLang={handleSetLanguage}/>
        {children}
        <Footer lang={language}/>
        <FloatingButton/>
      </langContext.Provider>
    </>
  );
}

export default LangController;
