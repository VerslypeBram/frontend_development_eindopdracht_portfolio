'use client';

import { createContext, useContext, useState } from 'react';

type CursorContextType = {
  isHovered: boolean;
  setHovered: (v: boolean) => void;
};

const CursorContext = createContext<CursorContextType>({
  isHovered: false,
  setHovered: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isHovered, setHovered] = useState(false);
  return (
    <CursorContext.Provider value={{ isHovered, setHovered }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  return useContext(CursorContext);
}
