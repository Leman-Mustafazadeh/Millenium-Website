// src/context/FooterContext.js

import React, { createContext, useState } from 'react';

// FooterContext oluştur
export const FooterContext = createContext();

// FooterProvider bileşeni
export const FooterProvider = ({ children }) => {
  const [footerColor, setFooterColor] = useState(''); // Arka plan rengi için durum

  return (
    <FooterContext.Provider value={{ footerColor, setFooterColor }}>
      {children}
    </FooterContext.Provider>
  );
};
