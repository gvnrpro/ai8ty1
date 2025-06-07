
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface FontContextType {
  fontsLoaded: boolean;
  fontError: boolean;
}

const FontContext = createContext<FontContextType>({ fontsLoaded: false, fontError: false });

export const useFonts = () => useContext(FontContext);

interface FontLoaderProps {
  children: ReactNode;
}

const FontLoader: React.FC<FontLoaderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Load Google Fonts
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        // Load 3D font
        const fontResponse = await fetch('/fonts/helvetiker_regular.typeface.json');
        if (!fontResponse.ok) {
          throw new Error('Failed to load 3D font');
        }

        // Wait for fonts to be ready
        await document.fonts.ready;
        
        setFontsLoaded(true);
        console.log('All fonts loaded successfully');
      } catch (error) {
        console.warn('Font loading failed, using fallbacks:', error);
        setFontError(true);
        setFontsLoaded(true); // Still proceed with fallbacks
      }
    };

    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={{ fontsLoaded, fontError }}>
      {children}
    </FontContext.Provider>
  );
};

export default FontLoader;
