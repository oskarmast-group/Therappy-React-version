import { useState, useEffect, createContext, useContext } from 'react';

const WindowSizeContext = createContext(null);

export const WindowSizeProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSize = () => {
  const context = useContext(WindowSizeContext);
  if (context === undefined) {
    throw new Error('useWindowSizeContext must be used within a WindowSizeProvider');
  }
  return context;
};
