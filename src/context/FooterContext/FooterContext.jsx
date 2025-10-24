
import React, { createContext, useState } from 'react';

export const FooterContext = createContext();

export const FooterProvider = ({ children }) => {
  const [footerColor, setFooterColor] = useState('');
  return (
    <FooterContext.Provider value={{ footerColor, setFooterColor }}>
      {children}
      </FooterContext.Provider>
    )}






