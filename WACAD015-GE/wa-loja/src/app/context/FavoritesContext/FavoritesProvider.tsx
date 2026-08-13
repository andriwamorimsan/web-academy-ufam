'use client'

import { createContext, useState } from 'react'
import { Product } from '@/app/types/product'

type FavoritesContextType = {
  favorites: Product[]
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {}
})

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])



  const values = {
    favorites,
    setFavorites
  }

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
