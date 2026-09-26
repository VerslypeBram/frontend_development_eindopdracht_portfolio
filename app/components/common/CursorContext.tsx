'use client'

import { createContext, useContext, useState } from 'react'

export type CursorVariant = 'default' | 'hover'

type CursorContextType = {
  variant: CursorVariant
  setVariant: (v: CursorVariant) => void
}

const CursorContext = createContext<CursorContextType>({
  variant: 'default',
  setVariant: () => {},
})

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default')

  return (
    <CursorContext.Provider value={{ variant, setVariant }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursorContext() {
  return useContext(CursorContext)
}
