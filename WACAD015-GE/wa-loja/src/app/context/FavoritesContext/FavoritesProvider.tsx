'use client'

import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { calculateDiscountedPrice } from '@/app/helpers'
import { Product } from '@/app/types/product'

type FavoritesContextType = {
  favorites: Product[]
  totalFavoritesValue: number
  addFavorite: (product: Product) => void
  removeFavorite: (id: string) => void
  checkIsFavorite: (id: string) => boolean
  isLoadingFavorites: boolean
  isAddingFavorite: boolean
  isRemovingFavorite: boolean
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  totalFavoritesValue: 0,
  addFavorite: () => {},
  removeFavorite: () => {},
  checkIsFavorite: () => false,
  isLoadingFavorites: false,
  isAddingFavorite: false,
  isRemovingFavorite: false
})

const FAVORITES_STORAGE_KEY = 'favorites'

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true)

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    setIsLoadingFavorites(false)
  }, [])

  const addFavorite = (product: Product) => {
    if (favorites.some((item) => item.id === product.id)) {
      return
    }

    const updatedFavorites = [...favorites, product]

    setFavorites(updatedFavorites)
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites))
    toast.success('Produto adicionado aos favoritos.')
  }

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id)

    setFavorites(updatedFavorites)
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites))
    toast.success('Produto removido dos favoritos.')
  }

  const totalFavoritesValue = favorites.reduce((acc, product) => {
    return (
      acc + calculateDiscountedPrice(Number(product.preco), product.desconto)
    )
  }, 0)

  const checkIsFavorite = (id: string) => {
    return favorites.some((item) => item.id === id)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        totalFavoritesValue,
        isAddingFavorite: false,
        isRemovingFavorite: false,
        isLoadingFavorites,
        addFavorite,
        removeFavorite,
        checkIsFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
