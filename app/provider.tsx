'use client';
import localforage from '@/lib/localforage';
import { ThemeProvider } from 'next-themes';
import { createContext, useContext } from 'react';

const LocalForageContext = createContext<LocalForage | null>(null);

export const LocalForageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider
      attribute="class"
      value={{
        light: 'light',
        dark: 'dark',
      }}
    >
      <LocalForageContext.Provider value={localforage}>
        {children}
      </LocalForageContext.Provider>
    </ThemeProvider>
  );
};

export const useLocalForage = () => {
  return useContext(LocalForageContext);
};
