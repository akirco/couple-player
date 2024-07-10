'use client';
import localforage from '@/lib/localforage';
import { createContext, useContext } from 'react';

const LocalForageContext = createContext<LocalForage | null>(null);

export const LocalForageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LocalForageContext.Provider value={localforage}>
      {children}
    </LocalForageContext.Provider>
  );
};

export const useLocalForage = () => {
  return useContext(LocalForageContext);
};
